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

import ch.fhnw.p2p.authorization.AccessControl;
import ch.fhnw.p2p.entities.Member;
import ch.fhnw.p2p.entities.Project;
import ch.fhnw.p2p.entities.User;
import ch.fhnw.p2p.entities.mapping.UserRatingState;
import ch.fhnw.p2p.repositories.MemberRepository;
import ch.fhnw.p2p.repositories.ProjectMemberRepositoryImpl;
import ch.fhnw.p2p.repositories.UserRepository;

/**
 * REST api controller to get or update the members of a project and the member's status
 *
 * @author Joel Meiller
 */
@RestController
@RequestMapping("/api/project")
public class MemberController extends BaseController {
	// ------------------------
	// PRIVATE FIELDS
	// ------------------------
	private Log logger = LogFactory.getLog(this.getClass());

	@Autowired
	private AccessControl accessControl;

	@Autowired
	private ProjectMemberRepositoryImpl projectRepoImpl;

	@Autowired
	private MemberRepository memberRepo;

	@Autowired
	UserRepository userRepo;

	// ------------------------
	// PUBLIC METHODS
	// ------------------------

	/**
	 * Returns all team members of the project (QM only) or the team members with the progress or the the final ratings
	 * 
	 * @return A list of members
	 */
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value = "/members", method = RequestMethod.GET)
	public ResponseEntity<Set<Member>> getProjectMembers(HttpServletRequest request) {
		logger.info("GET request for project/members");
		User user = accessControl.login(request, AccessControl.Allowed.ALL);	
		
		return new ResponseEntity<Set<Member>>(projectRepoImpl.getProjectMembers(user), HttpStatus.OK);
	}
	
	
	/**
	 * Adds, updates or deletes the members of the currently allocated project of the user. 
	 * This functionality is available only to the QM. 
	 * @param Set of members to update
	 * @return Set of updated members
	 */
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value = "/members", method = RequestMethod.POST)
	public ResponseEntity<Set<Member>> add(HttpServletRequest request, @Valid @RequestBody Set<Member> updatedMembers, BindingResult result) {
		logger.info("POST request for project/members");
		User user = accessControl.login(request, AccessControl.Allowed.QM);

		if (result.hasErrors()) {
			logger.error(result);
			return new ResponseEntity<Set<Member>>(HttpStatus.PRECONDITION_FAILED);
		}
		
		if (user.getMember().getProject().getStatus() == Project.Status.FINAL) {
			return new ResponseEntity<Set<Member>>(HttpStatus.NOT_ACCEPTABLE);
		}

		try {
			logger.info("Update members of project '" + user.getMember().getProject().getTitle() + "'");
			Project project = projectRepoImpl.updateProjectMembers(user.getMember().getProject(), updatedMembers);

			logger.info("Successfully updated members of project " + project.toString());
			return new ResponseEntity<Set<Member>>(project.getMembers(), HttpStatus.OK);
		} catch (Exception e) {
			logger.error("Server error", e);
			return new ResponseEntity<Set<Member>>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	/**
	 * Updates the member status and is used for...
	 * - project allocation confirmation by the user (FREE > OPEN)
	 * - closing of the member's ratings (OPEN > FINAL)
	 * - accpetance of its final rating and the grade deviation (FINAL > ACCEPTED)
	 * This functionality is available for all members of a project (QM, TM).
	 *  
	 * @param String containing the new status
	 * @return User rating state used in the settings of the web app
	 */
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value = "/members/status", method = RequestMethod.POST)
	public ResponseEntity<UserRatingState> updateStatus(HttpServletRequest request, @Valid @RequestBody Member.Status status, BindingResult result) {
		logger.info("POST request for project/members/status");
		User user = accessControl.login(request, AccessControl.Allowed.MEMBER);

		if (result.hasErrors()) {
			logger.error(result);
			return new ResponseEntity<UserRatingState>(HttpStatus.PRECONDITION_FAILED);
		}
		if (status == Member.Status.NEW) {
			return new ResponseEntity<UserRatingState>(HttpStatus.NOT_ACCEPTABLE);
		} else if (status == Member.Status.OPEN && user.getMember().getStatus() != Member.Status.NEW) {
			return new ResponseEntity<UserRatingState>(HttpStatus.NOT_ACCEPTABLE);
		} else if (status == Member.Status.FINAL && user.getMember().getStatus() != Member.Status.OPEN) {
			return new ResponseEntity<UserRatingState>(HttpStatus.NOT_ACCEPTABLE);
		} else if (status == Member.Status.ACCEPTED && user.getMember().getStatus() != Member.Status.FINAL) {
			return new ResponseEntity<UserRatingState>(HttpStatus.NOT_ACCEPTABLE);
		}

		try {
			user.getMember().setStatus(status);
			memberRepo.save(user.getMember());

			if (status == Member.Status.OPEN) {
				user.setStatus(User.Status.ALLOCATED);
				userRepo.save(user);
			}

			logger.info("Successfully updated member status to " + status + " of student " + user.toString());
			return new ResponseEntity<UserRatingState>(new UserRatingState(user.getMember()), HttpStatus.OK);
		} catch (Exception e) {
			logger.error("Server error", e);
			return new ResponseEntity<UserRatingState>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
