package ch.fhnw.p2p.controller;


import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import ch.fhnw.p2p.authorization.AccessControl;
import ch.fhnw.p2p.entities.CriteriaRating;
import ch.fhnw.p2p.entities.Member;
import ch.fhnw.p2p.entities.MemberRating;
import ch.fhnw.p2p.entities.Project;
import ch.fhnw.p2p.entities.User;
import ch.fhnw.p2p.entities.mapping.CriteriaRatingMapping;
import ch.fhnw.p2p.entities.mapping.MemberRatingMapping;
import ch.fhnw.p2p.evaluation.RatingCalculator;
import ch.fhnw.p2p.repositories.MemberRatingRepository;

/**
 * REST api controller to handle the member ratings
 *
 * @author Joel Meiller
 */
@RestController
@RequestMapping("/api/project/member")
public class MemberRatingController extends BaseController {

	// ------------------------
	// PRIVATE FIELDS
	// ------------------------
	private Log logger = LogFactory.getLog(this.getClass());
	
	@Autowired
	private AccessControl accessControl;
	
	@Autowired
	private MemberRatingRepository memberRatingRepo;
	
	
	// ------------------------
	// PUBLIC METHODS
	// ------------------------
	
	/**
	 * Returns the member with its team member ratings.
	 * 
	 * @return The member with the list of its member ratings
	 */
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value = "/ratings", method = RequestMethod.GET)
	public ResponseEntity<Member> getMemberRatings(HttpServletRequest request) {
		logger.info("GET Request for member/ratings");
		User user = accessControl.login(request, AccessControl.Allowed.MEMBER);
		
		RatingCalculator.calculateFinalMemberRating(user.getMember());
		user.getMember().setRatings(user.getMember().getMemberRatings(), true);
		
		logger.info("Succesfully read member/ratings of student " + user.toString());
		return new ResponseEntity<Member>(user.getMember(), HttpStatus.OK);
	}
	
	/**
	 * Returns the member's final ratings from other team members.
	 * 
	 * @return The member with the list of its final ratings Set<Member> 
	 */
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value = "member/ratings/final", method = RequestMethod.GET)
	public ResponseEntity<Member> getMembersFinalRatings(HttpServletRequest request) {
		logger.info("GET Request for member/ratings/final");
		User user = accessControl.login(request, AccessControl.Allowed.MEMBER);
		
		
		Member member = user.getMember();
		
		if (member.getProject().getStatus() != Project.Status.OPEN) {
			List<MemberRating> memberRatings = new ArrayList<MemberRating>();

			// Find ratings of other members for this member
			for (Member mem: member.getProject().getMembers()) {
				Iterator<MemberRating> it = mem.getMemberRatings().iterator();
				while (it.hasNext()) {
					MemberRating rating = it.next();
					if (rating.getTargetMember().getId() == member.getId()
					  && rating.getSourceMember().getStatus() == Member.Status.FINAL) {
						memberRatings.add(rating);
					}
				}
			}
			
			member.setMemberRatings(new HashSet<>(memberRatings));
		}
		
		logger.info("Succesfully read member/ratings/final of student " + user.toString());
		return new ResponseEntity<Member>(member, HttpStatus.OK);

	}
	
	/**
	 * Updates the rating of a single member
	 * 
	 * @param the new ratings for a team member
	 * @return the member (user) with all of its team member ratings 
	 */
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value = "/ratings", method = RequestMethod.POST)
	public ResponseEntity<Member> add(HttpServletRequest request, @Valid @RequestBody MemberRatingMapping updatedMemberRating, BindingResult result) {
		logger.info("POST request to set member/ratings");
		User user = accessControl.login(request, AccessControl.Allowed.MEMBER);	
		
		if (result.hasErrors()) {
			logger.error(result);
			return new ResponseEntity<Member>(HttpStatus.PRECONDITION_FAILED);
		}
		
		MemberRating memberRating = memberRatingRepo.findByIdAndSourceMemberId(updatedMemberRating.getId(), user.getMember().getId());
		if (memberRating == null) return new ResponseEntity<Member>(HttpStatus.BAD_REQUEST);
		
		if (user.getMember().getProject().getStatus() == Project.Status.FINAL) {
			return new ResponseEntity<Member>(HttpStatus.NOT_ACCEPTABLE);
		}
		
		try {
			logger.info("Update team member ratings of " + user.getMember().toString());
			
			if (updatedMemberRating.getComment() != null) {
				memberRating.setComment(updatedMemberRating.getComment());
			}
				
			for (CriteriaRating criteriaRating : memberRating.getCriteriaRatings()) {
				CriteriaRatingMapping updatedRating = updatedMemberRating.getCriteriaRatings().stream()
						.filter(r -> r.getId() == criteriaRating.getId()).findFirst().get();

				criteriaRating.setRating(updatedRating.getRating());
			}
		
			logger.info("Checking for member rating status");
			boolean isFinalRating = RatingCalculator.calculateMemberRating(memberRating) == null;
			memberRatingRepo.save(memberRating);
			
			logger.info("Successfully updated member rating " + memberRating.toString());
			
			if (isFinalRating) {
				logger.info("Check all member ratings status");
				user.getMember().checkAndSetFinalRatings();
			}
			
			return new ResponseEntity<Member>(user.getMember(), HttpStatus.OK);
		} catch (Exception e) {
			logger.error("Server error", e);
			return new ResponseEntity<Member>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
