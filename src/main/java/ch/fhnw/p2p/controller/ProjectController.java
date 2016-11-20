package ch.fhnw.p2p.controller;

import ch.fhnw.p2p.authorization.AccessControl;
import ch.fhnw.p2p.entities.Member;
import ch.fhnw.p2p.entities.Project;
import ch.fhnw.p2p.entities.Role;
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

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
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
@CrossOrigin(origins = "http://localhost:3000")
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
	
	@PersistenceContext
	EntityManager entityManager;

	// ------------------------
	// PUBLIC METHODS
	// ------------------------
	
	/**
	 * Fetch full project (for editing).
	 */
	@RequestMapping(value="{id}", method = RequestMethod.GET)
	public ResponseEntity<Project> getProject(@PathVariable Long id) {
		Project project = projectRepo.findById(id);
		return new ResponseEntity<Project>(project, HttpStatus.OK);
	}

	/**
	 * Update an existing project.
	 */
	@RequestMapping(value="{id}", method = RequestMethod.PUT)
	public ResponseEntity<HttpStatus> updateProject(@PathVariable Long id, @Valid @RequestBody Project project, BindingResult result) {
		if (result.hasErrors()) {
			return new ResponseEntity<HttpStatus>(HttpStatus.PRECONDITION_FAILED);
		}
		Project oldProject = projectRepo.findById(project.getId());
		if (oldProject == null) {
			return new ResponseEntity<HttpStatus>(HttpStatus.NOT_FOUND);
		}
		oldProject.setTitle(project.getTitle());
		oldProject.setStart(project.getStart());
		oldProject.setStop(project.getStop());
		oldProject.setZeitmodell(project.getZeitmodell());
		try {
			projectRepo.save(oldProject);
			logger.debug("Successfully updated project[" + project.getId() + "]: " + project.toString());
			return new ResponseEntity<HttpStatus>(HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<HttpStatus>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	/**
	 * Create a new project.
	 */
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<HttpStatus> addProject(@Valid @RequestBody Project project, BindingResult result) {
		if (result.hasErrors()) {
			return new ResponseEntity<HttpStatus>(HttpStatus.PRECONDITION_FAILED);
		}
		try {
			projectRepo.save(project);
			logger.debug("Successfully saved project[" + project.getId() + "]: " + project.toString());
			return new ResponseEntity<HttpStatus>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<HttpStatus>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	/**
	 * Fetch list of abbreviated projects (for overview).
	 */
	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<List<Project>> getProjects(HttpServletRequest request) {
		logger.info("GET request for projectList");
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
