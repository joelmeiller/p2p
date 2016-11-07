package ch.fhnw.p2p.controller;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

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
import ch.fhnw.p2p.repositories.CriteriaRatingRepository;
import ch.fhnw.p2p.repositories.MemberRatingRepository;
import ch.fhnw.p2p.repositories.MemberRepository;

/**
 * REST api controller for the categories collection
 *
 * @author Joel Meiller
 */

@RestController
@RequestMapping("/api/project/members")
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
	@RequestMapping(value = "/rating/{id}", method = RequestMethod.GET)
	public ResponseEntity<List<MemberRating>> getMemberRating(@PathVariable Long id) {
		// TODO: This is the access control section which should be in a separate class
		Member member = memberRepo.findByStudentEmail("heidi.vonderheide@students.fhnw.ch");
		if (member == null || member.getProject() == null) return new ResponseEntity<List<MemberRating>>(HttpStatus.FORBIDDEN);
		
		logger.info("Request from " + member.getStudent().getEmail() + " for project " + member.getProject().getTitle());
		
		if (member.getProject() == null) {
			logger.info("No project found");
			return new ResponseEntity<List<MemberRating>>(HttpStatus.NO_CONTENT);
		} else {
			Member ratedMember = memberRepo.findOne(id);
			if (ratedMember == null) {
				logger.info("Member not found");
				return new ResponseEntity<List<MemberRating>>(HttpStatus.NO_CONTENT);
			} else {
				logger.info("Successfully read " + member.getMemberRatings());
				return new ResponseEntity<List<MemberRating>>(member.getMemberRatings(), HttpStatus.OK);
			}
		}
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value = "/rating/{id}", method = RequestMethod.POST)
	public ResponseEntity<HttpStatus> add(@PathVariable Long id, @Valid @RequestBody List<MemberRating> updatedMemberRatings, BindingResult result) {
		if (result.hasErrors()) {
			logger.error(result);
			return new ResponseEntity<HttpStatus>(HttpStatus.PRECONDITION_FAILED);
		}
		
		Member member = memberRepo.findByStudentEmail("heidi.vonderheide@students.fhnw.ch");
		if (member == null || member.getProject() == null) return new ResponseEntity<HttpStatus>(HttpStatus.FORBIDDEN);

		Member ratedMember = memberRepo.findOne(id);
		if (ratedMember == null) {
			logger.info("Member not found");
			return new ResponseEntity<HttpStatus>(HttpStatus.NO_CONTENT);
		} 
		
		try {
			logger.info("Update team member ratings of member " + member.toString() + "(id=" + member.getId() + ")");
			
			List<MemberRating> memberRatings = new ArrayList<MemberRating>();
			
			for (MemberRating updatedMemberRating: updatedMemberRatings) {
				logger.info("Update rating (id='" + updatedMemberRating.getId() + "'");
				MemberRating memberRating = memberRatingRepo.findOne(updatedMemberRating.getId());
				
				for (CriteriaRating criteriaRating: memberRating.getCriteriaRatings()) {
					Optional<CriteriaRating> updatedRating = updatedMemberRating.getCriteriaRatings()
							.stream().filter(r -> r.getId() == criteriaRating.getId()).findFirst();
					
					criteriaRating.setRating(updatedRating.get().getRating());
				}
				memberRatings.add(memberRating);
			}
		
			ratedMember.setMemberRatings(memberRatings);
			logger.info("Save member ratings for " + ratedMember.toString());
			memberRepo.saveAndFlush(ratedMember);	
			logger.info("Successfully updated member ratings for " + ratedMember.toString() + "(id=" + ratedMember.getId() + ")");
			return new ResponseEntity<HttpStatus>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<HttpStatus>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
