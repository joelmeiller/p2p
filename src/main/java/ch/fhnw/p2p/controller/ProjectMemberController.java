package ch.fhnw.p2p.controller;

import java.util.List;

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
public class ProjectMemberController {
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
	 * /findAll --> Returns all project related categories and criterias.
	 * 
	 * @return A list of criterias
	 */
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value = "/members", method = RequestMethod.GET)
	public ResponseEntity<List<Member>> getProjectMembers() {
		// TODO: This is the access control section which should be in a separate class
		Member member = memberRepo.findByStudentEmail("max.muster@students.fhnw.ch");
		if (member == null || member.getProject() == null) return new ResponseEntity<List<Member>>(HttpStatus.FORBIDDEN);
		
		logger.info("Student login: " + member.getStudent().getEmail() + " for project " + member.getProject().getTitle());
		
		if (member.getProject() == null) {
			logger.info("No project found");
			return new ResponseEntity<List<Member>>(HttpStatus.NO_CONTENT);
		} else {
			logger.info("Successfully read " + member.getProject().getTitle());
			return new ResponseEntity<List<Member>>(member.getProject().getMembers(), HttpStatus.OK);
		}
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value = "/members", method = RequestMethod.POST)
	public ResponseEntity<List<Member>> add(@Valid @RequestBody List<Member> updatedMembers, BindingResult result) {
		if (result.hasErrors()) {
			logger.error(result);
			return new ResponseEntity<List<Member>>(HttpStatus.PRECONDITION_FAILED);
		}
		try {
			Member member = memberRepo.findByStudentEmail("max.muster@students.fhnw.ch");
			if (member == null || member.getProject() == null) return new ResponseEntity<List<Member>>(HttpStatus.FORBIDDEN);
			
			logger.info("Update members of project '" + member.getProject().getTitle() + "'");
			Project project = projectRepoImpl.updateProject(member.getProject(), updatedMembers);
			
			logger.info("Successfully updated members of project " + project.getTitle() + " [" + project.getId() + "]");
			return new ResponseEntity<List<Member>>(project.getMembers(), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<List<Member>>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
