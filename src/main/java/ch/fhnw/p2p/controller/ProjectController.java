package ch.fhnw.p2p.controller;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import ch.fhnw.p2p.authorization.AccessControl;
import ch.fhnw.p2p.controller.utils.BadRequestException;
import ch.fhnw.p2p.controller.utils.NotFoundException;
import ch.fhnw.p2p.entities.Category;
import ch.fhnw.p2p.entities.Member;
import ch.fhnw.p2p.entities.Project;
import ch.fhnw.p2p.entities.Project.Status;
import ch.fhnw.p2p.entities.ProjectCategory;
import ch.fhnw.p2p.entities.Role;
import ch.fhnw.p2p.entities.User;
import ch.fhnw.p2p.entities.mapping.MappingException;
import ch.fhnw.p2p.entities.mapping.NewProject;
import ch.fhnw.p2p.entities.mapping.ProjectMapping;
import ch.fhnw.p2p.repositories.CategoryRepository;
import ch.fhnw.p2p.repositories.ProjectMemberRepositoryImpl;
import ch.fhnw.p2p.repositories.ProjectRepository;
import ch.fhnw.p2p.repositories.RoleRepository;
import ch.fhnw.p2p.repositories.UserRepository;

/**
 * REST api controller for the project list
 *
 * @author Michelle Andrey
 */

@RestController
@RequestMapping("/api/projects")
public class ProjectController extends BaseController {

	private Log logger = LogFactory.getLog(this.getClass());

	@Autowired
	private AccessControl accessControl;

	@Autowired
	private ProjectRepository projectRepo;
	
	@Autowired
	private ProjectMemberRepositoryImpl projectMemberRepo;

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private RoleRepository roleRepo;

	@Autowired
	private CategoryRepository categoryRepo;

	
	/**
	 * Fetch list of abbreviated projects.
	 */
	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<List<Project>> getProjects(HttpServletRequest request) {
		User user = accessControl.login(request, AccessControl.Allowed.COACH);
		logger.info("GET projects user=" + user.getEmail());

		List<Project> projectList = projectRepo.findAll();

		for (Project project : projectList) {
			stripProject(project);
		}
		return new ResponseEntity<List<Project>>(projectList, HttpStatus.OK);
	}

	/**
	 * Fetch single abbreviated project.
	 */
	@RequestMapping(value="{id}", method = RequestMethod.GET)
	public ResponseEntity<Project> getProject(HttpServletRequest request, @PathVariable Long id) {
		User user = accessControl.login(request, AccessControl.Allowed.COACH);
		logger.info("GET project user=" + user.getEmail());

		Project project = projectRepo.findById(id);
		stripProject(project);
		return new ResponseEntity<Project>(project, HttpStatus.OK);
	}

	/**
	 * Update an existing project -- UI only supports changing of status from
	 * final to closed.
	 */
	@RequestMapping(value = "{id}/status", method = RequestMethod.PUT)
	public ResponseEntity<ApiResponse> updateProject(HttpServletRequest request, @PathVariable Long id,
			@Valid @RequestBody Status status, BindingResult result) {
		User user = accessControl.login(request, AccessControl.Allowed.COACH);
		logger.info("PUT project user=" + user.getEmail());

		if (result.hasErrors())
			throw new BadRequestException("Invalid object");

		Project project = projectRepo.findById(id);
		if (project == null)
			throw new NotFoundException("Project not found");
		if (project.getStatus() == status) {
			return ApiResponse.create("Status not changed");
		}
		if (project.getStatus() != Status.FINAL || status != Status.CLOSE) {
			throw new BadRequestException("Only FINAL -> CLOSE is allowed");
		}
		project.setStop(new Date());
		project.setStatus(Status.CLOSE);

		projectRepo.save(project);
		logger.debug("Successfully updated project[" + project.getId() + "].status=" + status);
		return ApiResponse.create("Status changed to" + status);
	}
	
	/**
	 * Close an open project.
	 */
	@RequestMapping(value = "/projects/close", method = RequestMethod.PUT)
	public ResponseEntity<ProjectMapping> closeProject(HttpServletRequest request, @Valid @RequestBody ProjectMapping project, BindingResult result) {
		User user = accessControl.login(request, AccessControl.Allowed.QM);
		logger.info("PUT close project user=" + user.getEmail());
		if (result.hasErrors()) {
			return new ResponseEntity<ProjectMapping>(HttpStatus.PRECONDITION_FAILED);
		}
		Project oldProject = projectRepo.findById(project.getId());
		if (oldProject == null) {
			return new ResponseEntity<ProjectMapping>(HttpStatus.NOT_FOUND);
		}
		
		if (oldProject.getStatus() == Project.Status.FINAL) {
			for (Member member: oldProject.getMembers()) {
				if (member.getStatus() != Member.Status.ACCEPTED) {
					return new ResponseEntity<ProjectMapping>(HttpStatus.NOT_ACCEPTABLE);
				}
			}
			oldProject.setStatus(Project.Status.CLOSE);
			
			try {
				projectRepo.save(oldProject);
				logger.debug("Successfully closed project[" + project.getId() + "]: " + project.toString());
				return new ResponseEntity<ProjectMapping>(new ProjectMapping(oldProject), HttpStatus.OK);
			} catch (Exception e) {
				e.printStackTrace();
				return new ResponseEntity<ProjectMapping>(HttpStatus.INTERNAL_SERVER_ERROR);
			}
		} else {
			return new ResponseEntity<ProjectMapping>(HttpStatus.NOT_ACCEPTABLE);
		}
	}

	/**
	 * Create a new project. The posted project must contain a Member with a
	 * user that has the email address set.
	 */
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<ApiResponse> addProject(HttpServletRequest request, @Valid @RequestBody NewProject newProject,
			BindingResult bindingResult) {
		User user = accessControl.login(request, AccessControl.Allowed.COACH);
		logger.info("POST project user=" + user.getEmail());

		Project project;
		try {
			project = setupProject(newProject.getProject(bindingResult), newProject.getEmailQm());
		} catch (MappingException e) {
			throw new BadRequestException(e.getMessage());
		}

		projectRepo.save(project);
		logger.debug("Successfully saved project[" + project.getId() + "]: " + project.toString());
		return ApiResponse.create("Created project ID=" + project.getId());
	}
	
	/**
	 * add all project categories without criterias for initial selection and set QM as only member
	 * 
	 * @param Project the user's current project
	 * @return Project the project enriched with all categories
	 * @throws MappingException 
	 */
	private Project setupProject(Project project, String emailQm) throws MappingException {
		// Add categories
		List<Category> categories = categoryRepo.findAll();
		logger.info("Add categories (count=" + categories.size() + ")");
		
		for (Category category: categories) {
			ProjectCategory projectCategory = new ProjectCategory(category);
			project.getProjectCategories().add(projectCategory);
			projectCategory.setProject(project);
		}
		
		// Add QM
		Optional<User> qmUser = userRepo.findByEmail(emailQm);
		logger.info("Add member as QM :" + qmUser.toString());
		
		if (!qmUser.isPresent()) throw new MappingException("User not found: " + emailQm);
		if (qmUser.get().getStatus() != User.Status.FREE) throw new MappingException("User " + emailQm + " is not free");
		
		Role qmRole = roleRepo.findByShortcut("QM");
		if (qmRole == null) throw new MappingException("Role QM not found");
		
		Member qmMember = new Member(project, qmUser.get(), qmRole);
		project.getMembers().add(qmMember);

		projectMemberRepo.addMemberToRatings(qmMember);
		
		return project;
	}

	private static void stripProject(Project project) {
		project.getMembers().clear();
		project.getProjectCategories().clear();
		project.getMembers().clear();
	}
}
