package ch.fhnw.p2p.controller;

import java.util.List;

import javax.validation.Valid;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import ch.fhnw.p2p.entities.Member;
import ch.fhnw.p2p.entities.Project;
import ch.fhnw.p2p.entities.ProjectCategory;
import ch.fhnw.p2p.repositories.MemberRepository;
import ch.fhnw.p2p.repositories.ProjectCategoryRepository;
import ch.fhnw.p2p.repositories.ProjectRepository;
import lombok.extern.slf4j.Slf4j;

/**
 * REST api controller for the categories collection
 *
 * @author Joel Meiller
 */
@Slf4j
@Controller
@RequestMapping("/project")
public class ProjectController {
	// ------------------------
	// PRIVATE FIELDS
	// ------------------------
	private Log logger = LogFactory.getLog(this.getClass());
	
	@Autowired
	private ProjectRepository projectRepo;
	
	@Autowired
	private ProjectCategoryRepository projectCategoryRepo;
	
	@Autowired
	private MemberRepository memberRepo;

	// ------------------------
	// PUBLIC METHODS
	// ------------------------
	
	/**
	 * /findAll --> Returns all project related categories and criterias.
	 * 
	 * @return A list of criterias
	 */
	@RequestMapping(value = "/categories", method = RequestMethod.GET)
	public ResponseEntity<List<ProjectCategory>> getProjectCriterias() {
		// TODO: This is the access control section which should be in a separate class
		Member member = memberRepo.findByStudentEmail("max.muster@students.fhnw.ch");
		if (member == null) return new ResponseEntity<List<ProjectCategory>>(HttpStatus.FORBIDDEN);
		
		logger.info("Student login: " + member.getStudent().getEmail() + " for project " + member.getProject().getTitle());
		Project project = projectRepo.findByIdAndStatus(member.getProject().getId(), Project.Status.OPEN);

		if (project == null) {
			logger.info("No project found");
			return new ResponseEntity<List<ProjectCategory>>(HttpStatus.NO_CONTENT);
		} else {
			logger.info("Successfully read " + project.getTitle());
			List<ProjectCategory> categories = projectCategoryRepo.findByProject(project);
			logger.info("Found categories (count=" + categories.size() + ")");
			logger.info(categories.get(0));
			return new ResponseEntity<List<ProjectCategory>>(categories, HttpStatus.OK);
		}
	}
	
	
	@RequestMapping(value = "/categories", method = RequestMethod.POST)
	public ResponseEntity<Project> add(@Valid @RequestBody Project updatedProject, BindingResult result) {
		if (result.hasErrors()) {
			return new ResponseEntity<Project>(HttpStatus.PRECONDITION_FAILED);
		}
		try {
			Project project = projectRepo.findOne(updatedProject.getId());
			if (project == null) throw new ProjectNotFoundException(updatedProject.getId());
			project.setCategories(updatedProject.getCategories());
			logger.debug("Successfully added categories to project " + project.getTitle() + " [" + project.getId() + "]");
			return new ResponseEntity<Project>(project, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Project>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}

@ResponseStatus(HttpStatus.NOT_FOUND)
class ProjectNotFoundException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public ProjectNotFoundException(Long projectId) {
		super("could not find project '" + projectId + "'.");
	}
}
