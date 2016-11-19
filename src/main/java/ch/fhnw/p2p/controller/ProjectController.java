package ch.fhnw.p2p.controller;

import ch.fhnw.p2p.authorization.AccessControl;
import ch.fhnw.p2p.entities.Member;
import ch.fhnw.p2p.entities.Project;
import ch.fhnw.p2p.entities.User;
import ch.fhnw.p2p.repositories.MemberRepository;
import ch.fhnw.p2p.repositories.ProjectRepositoryImpl;
import ch.fhnw.p2p.repositories.UserRepository;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.HashSet;
import java.util.Set;

/**
 * REST api controller for the project list
 *
 * @author Michelle Andrey
 */

@RestController
@RequestMapping("/api/projects")
public class ProjectController {
	// ------------------------
	// PRIVATE FIELDS
	// ------------------------
	private Log logger = LogFactory.getLog(this.getClass());

	@Autowired
	private AccessControl accessControl;

	@Autowired
	private ProjectRepositoryImpl projectRepoImpl;

	@Autowired
	private MemberRepository memberRepo;

	@Autowired
	UserRepository userRepo;

	// ------------------------
	// PUBLIC METHODS
	// ------------------------

	/**
	 *
	 * @return A list of projects
	 */
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<Set<Project>> getProjects(HttpServletRequest request) {
		logger.info("GET request for project/projects");
		User user = accessControl.login(request, AccessControl.Allowed.COACH);

    logger.info("Successfully read projects for " + user.toString());
    Set<Project> projectList = new HashSet<Project>();
    return new ResponseEntity<Set<Project>>(projectList, HttpStatus.OK);
  }
}
