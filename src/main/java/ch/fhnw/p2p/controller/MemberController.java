package ch.fhnw.p2p.controller;

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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import ch.fhnw.p2p.entities.Member;
import ch.fhnw.p2p.entities.Project;
import ch.fhnw.p2p.repositories.MemberRepository;
import ch.fhnw.p2p.repositories.ProjectRepositoryImpl;

/**
 * REST api controller for the categories collection
 *
 * @author Joel Meiller
 */

@RestController
@RequestMapping("/api/project")
public class MemberController {
	// ------------------------
	// PRIVATE FIELDS
	// ------------------------
	private Log logger = LogFactory.getLog(this.getClass());
	
	@Autowired
	private MemberRepository memberRepo;

	@Autowired
	private ProjectRepositoryImpl projectRepoImpl;
	
	// ------------------------
	// PUBLIC METHODS
	// ------------------------
	
	/**
	 * /findAll --> Returns all team members of the project (QM only).
	 * 
	 * @return A list of members
	 */
	@CrossOrigin(origins = "http://localhost:3000, http://server1073.cs.technik.fhnw.ch:8080")
	@RequestMapping(value = "/members", method = RequestMethod.GET)
	public ResponseEntity<Set<Member>> getProjectMembers(HttpServletRequest request) {
		logger.info(request.getAttribute("Shib-Identity-Provider"));
		logger.info(request.getHeader("Shib-Identity-Provider"));
		
		// TODO: This is the access control section which should be in a separate class
		Member member = memberRepo.findByStudentEmail("max.muster@students.fhnw.ch");
		if (member == null || member.getProject() == null) return new ResponseEntity<Set<Member>>(HttpStatus.FORBIDDEN);
		
		logger.info("Request from " + member.getStudent().getEmail() + " for project " + member.getProject().getTitle());
		
		if (member.getProject() == null) {
			logger.info("No project found");
			return new ResponseEntity<Set<Member>>(HttpStatus.NO_CONTENT);
		} else {
			logger.info("Successfully read " + member.getProject().getTitle());
			return new ResponseEntity<Set<Member>>(member.getProject().getMembers(), HttpStatus.OK);
		}
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value = "/members", method = RequestMethod.POST)
	public ResponseEntity<Set<Member>> add(@Valid @RequestBody Set<Member> updatedMembers, BindingResult result) {
		if (result.hasErrors()) {
			logger.error(result);
			return new ResponseEntity<Set<Member>>(HttpStatus.PRECONDITION_FAILED);
		}
		
		Member member = memberRepo.findByStudentEmail("max.muster@students.fhnw.ch");
		if (member == null || member.getProject() == null) return new ResponseEntity<Set<Member>>(HttpStatus.FORBIDDEN);
		
		try {
			logger.info("Update members of project '" + member.getProject().getTitle() + "'");
			Project project = projectRepoImpl.updateProject(member.getProject(), updatedMembers);
			
			logger.info("Successfully updated members of project " + project.getTitle() + " [" + project.getId() + "]");
			return new ResponseEntity<Set<Member>>(project.getMembers(), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Set<Member>>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
