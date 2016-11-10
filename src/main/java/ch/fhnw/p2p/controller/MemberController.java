package ch.fhnw.p2p.controller;

import java.util.Set;

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
import ch.fhnw.p2p.entities.Member;
import ch.fhnw.p2p.entities.Project;
import ch.fhnw.p2p.entities.User;
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
	
	private User user;
	
	@Autowired
	private ProjectRepositoryImpl projectRepoImpl;
	
	@Autowired
	private AccessControl accessControl;
	
	// ------------------------
	// PUBLIC METHODS
	// ------------------------
	
	/**
	 * /findAll --> Returns all team members of the project (QM only).
	 * 
	 * @return A list of members
	 */
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value = "/members", method = RequestMethod.GET)
	public ResponseEntity<Set<Member>> getProjectMembers() {
		logger.info("Request for project/members");
		// User user = AccessControl.login(request.getHeader("username"));
		this.user = accessControl.login("heidi.vonderheide@students.fhnw.ch", AccessControl.Allowed.QM);	
				
		if (this.user.getMember().getProject() == null) {
			logger.info("No project found");
			return new ResponseEntity<Set<Member>>(HttpStatus.NO_CONTENT);
		} else {
			logger.info("Successfully read " + this.user.getMember().getProject().getTitle());
			return new ResponseEntity<Set<Member>>(this.user.getMember().getProject().getMembers(), HttpStatus.OK);
		}
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value = "/members", method = RequestMethod.POST)
	public ResponseEntity<Set<Member>> add(@Valid @RequestBody Set<Member> updatedMembers, BindingResult result) {
		// User user = AccessControl.login(request.getHeader("username"));
		this.user = accessControl.login("heidi.vonderheide@students.fhnw.ch", AccessControl.Allowed.QM);			
		
		if (result.hasErrors()) {
			logger.error(result);
			return new ResponseEntity<Set<Member>>(HttpStatus.PRECONDITION_FAILED);
		}
		
		try {
			logger.info("Update members of project '" + this.user.getMember().getProject().getTitle() + "'");
			Project project = projectRepoImpl.updateProject(this.user.getMember().getProject(), updatedMembers);
			
			logger.info("Successfully updated members of project " + project.getTitle() + " [" + project.getId() + "]");
			return new ResponseEntity<Set<Member>>(project.getMembers(), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Set<Member>>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
