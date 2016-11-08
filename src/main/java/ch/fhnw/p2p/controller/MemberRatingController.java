package ch.fhnw.p2p.controller;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import ch.fhnw.p2p.entities.CriteriaRating;
import ch.fhnw.p2p.entities.Member;
import ch.fhnw.p2p.entities.MemberRating;
import ch.fhnw.p2p.entities.mapping.CriteriaRatingMapping;
import ch.fhnw.p2p.entities.mapping.MemberRatingMapping;
import ch.fhnw.p2p.repositories.CriteriaRatingRepository;
import ch.fhnw.p2p.repositories.MemberRatingRepository;
import ch.fhnw.p2p.repositories.MemberRepository;

/**
 * REST api controller for the categories collection
 *
 * @author Joel Meiller
 */

@RestController
@RequestMapping("/api/project/member")
public class MemberRatingController {
	// ------------------------
	// PRIVATE FIELDS
	// ------------------------
	private Log logger = LogFactory.getLog(this.getClass());
	
	@Autowired
	private MemberRepository memberRepo;

	@Autowired
	private MemberRatingRepository memberRatingRepo;
	
	@Autowired
	private CriteriaRatingRepository criteriaRatingRepo;
	
	// ------------------------
	// PUBLIC METHODS
	// ------------------------
	
	/**
	 * /findAll --> Returns all project related categories and criterias.
	 * 
	 * @return A list of criterias
	 */
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value = "/ratings", method = RequestMethod.GET)
	public ResponseEntity<Member> getMemberRating(HttpServletRequest request) {
		logger.info(request.getAttribute("Shib-Identity-Provider"));
		logger.info(request.getHeader("Shib-Identity-Provider"));
		
		// TODO: This is the access control section which should be in a separate class
		Member member = memberRepo.findByStudentEmail("heidi.vonderheide@students.fhnw.ch");
		if (member == null || member.getProject() == null) return new ResponseEntity<Member>(HttpStatus.FORBIDDEN);
		
		logger.info("Request from " + member.getStudent().getEmail() + " for project " + member.getProject().getTitle());
		return new ResponseEntity<Member>(member, HttpStatus.OK);
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value = "/ratings", method = RequestMethod.POST)
	public ResponseEntity<HttpStatus> add(@RequestBody MemberRatingMapping updatedMemberRating, BindingResult result) {
		logger.info(updatedMemberRating);
		logger.info(result);
		if (result.hasErrors()) {
			logger.error(result);
			return new ResponseEntity<HttpStatus>(HttpStatus.PRECONDITION_FAILED);
		}
		
		Member member = memberRepo.findByStudentEmail("heidi.vonderheide@students.fhnw.ch");
		if (member == null || member.getProject() == null) return new ResponseEntity<HttpStatus>(HttpStatus.FORBIDDEN);

		logger.info("MemberRating " + updatedMemberRating.getId() + " / " + updatedMemberRating.getComment());
		MemberRating memberRating = memberRatingRepo.findByIdAndSourceMemberId(updatedMemberRating.getId(), member.getId());
		
		if (memberRating == null) return new ResponseEntity<HttpStatus>(HttpStatus.BAD_REQUEST);
		
		
		try {
			logger.info("Update team member ratings of " + member.toString());
			
			if (updatedMemberRating.getComment() != null) {
				memberRating.setComment(updatedMemberRating.getComment());
			}
				
			for (CriteriaRating criteriaRating : memberRating.getCriteriaRatings()) {
				Optional<CriteriaRatingMapping> updatedRating = updatedMemberRating.getCriteriaRatings().stream()
						.filter(r -> r.getId() == criteriaRating.getId()).findFirst();

				criteriaRating.setRating(updatedRating.get().getRating());
			}
		
			logger.info("Save member rating " + memberRating.toString());
			memberRatingRepo.save(memberRating);	
			return new ResponseEntity<HttpStatus>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<HttpStatus>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
