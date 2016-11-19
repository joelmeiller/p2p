package ch.fhnw.p2p.controller;

import ch.fhnw.p2p.authorization.AccessControl;
import ch.fhnw.p2p.entities.Member;
import ch.fhnw.p2p.entities.Project;
import ch.fhnw.p2p.entities.User;
import ch.fhnw.p2p.repositories.MemberRepository;
import ch.fhnw.p2p.repositories.ProjectRepository;
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

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
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
	private ProjectRepository projectRepo;

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
	public ResponseEntity<List<Project>> getProjects(HttpServletRequest request) {
		logger.info("GET request for project/projects");
		User user = accessControl.login(request, AccessControl.Allowed.COACH);

		logger.info("Successfully read projects for " + user.toString());
		List<Project> projectList = projectRepo.findAll();

		for (Project project : projectList) {
			Member QM = null;
			for (Member member : project.getMembers()) {
				if (member.isQM()) {
					QM = member;
					QM.setRatings(new HashSet<>());
				}
			}
			project.setProjectCategories(new HashSet<>());
			project.setMembers(new HashSet<>());
			if (QM != null) {
				project.getMembers().add(QM);
			}
		}
		return new ResponseEntity<List<Project>>(projectList, HttpStatus.OK);
	}
}
