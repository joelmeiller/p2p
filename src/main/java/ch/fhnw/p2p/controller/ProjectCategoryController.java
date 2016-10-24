package ch.fhnw.p2p.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import ch.fhnw.p2p.controller.utils.ProjectNotFoundException;
import ch.fhnw.p2p.entities.Member;
import ch.fhnw.p2p.entities.Project;
import ch.fhnw.p2p.entities.ProjectCategory;
import ch.fhnw.p2p.entities.ProjectCriteria;
import ch.fhnw.p2p.repositories.CategoryRepository;
import ch.fhnw.p2p.repositories.CriteriaRepository;
import ch.fhnw.p2p.repositories.MemberRepository;
import ch.fhnw.p2p.repositories.ProjectCategoryRepository;
import ch.fhnw.p2p.repositories.ProjectCriteriaRepository;
import ch.fhnw.p2p.repositories.ProjectRepository;

/**
 * REST api controller for the categories collection
 *
 * @author Joel Meiller
 */

@Controller
@RequestMapping("/api/project")
public class ProjectCategoryController {
	// ------------------------
	// PRIVATE FIELDS
	// ------------------------
	private Log logger = LogFactory.getLog(this.getClass());
	
	@Autowired
	private ProjectRepository projectRepo;
	
	@Autowired
	private MemberRepository memberRepo;
	
	@Autowired
	private ProjectCriteriaRepository projectCriteriaRepo;
	
	@Autowired
	private ProjectCategoryRepository projectCategoryRepo;
	
	@Autowired
	private CriteriaRepository criteriaRepo;

	// ------------------------
	// PUBLIC METHODS
	// ------------------------
	
	/**
	 * /findAll --> Returns all project related categories and criterias.
	 * 
	 * @return A list of criterias
	 */
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value = "/categories", method = RequestMethod.GET)
	public ResponseEntity<List<ProjectCategory>> getProjectCriterias() {
		// TODO: This is the access control section which should be in a separate class
		Member member = memberRepo.findByStudentEmail("max.muster@students.fhnw.ch");
		if (member == null || member.getProject() == null) return new ResponseEntity<List<ProjectCategory>>(HttpStatus.FORBIDDEN);
		
		logger.info("Student login: " + member.getStudent().getEmail() + " for project " + member.getProject().getTitle());
		
		if (member.getProject() == null) {
			logger.info("No project found");
			return new ResponseEntity<List<ProjectCategory>>(HttpStatus.NO_CONTENT);
		} else {
			logger.info("Successfully read " + member.getProject().getTitle());
			return new ResponseEntity<List<ProjectCategory>>(member.getProject().getProjectCategories(), HttpStatus.OK);
		}
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value = "/categories", method = RequestMethod.POST)
	public ResponseEntity<List<ProjectCategory>> add(@Valid @RequestBody List<ProjectCategory> updatedCategories, BindingResult result) {
		if (result.hasErrors()) {
			logger.error(result);
			return new ResponseEntity<List<ProjectCategory>>(HttpStatus.PRECONDITION_FAILED);
		}
		try {
			Member member = memberRepo.findByStudentEmail("max.muster@students.fhnw.ch");
			if (member == null || member.getProject() == null) return new ResponseEntity<List<ProjectCategory>>(HttpStatus.FORBIDDEN);
			
			logger.info("Save Categories for student: " + member.getStudent().getEmail() + " for project " + member.getProject().getTitle());
			Project project = member.getProject();
			
			if (project == null) throw new ProjectNotFoundException(member);
			
			List<ProjectCategory> projectCategories = new ArrayList<ProjectCategory>();
			// Set categories and criterias
			for (ProjectCategory projCat: updatedCategories) {
				ProjectCategory projectCategory = projectCategoryRepo.findOne(projCat.getId());
						
				for (ProjectCriteria projCrit: projCat.getProjectCriterias()) {
					// Add new
					if (projCrit.isAdded()) {
						ProjectCriteria projectCriteria = new ProjectCriteria(criteriaRepo.findOne(projCrit.getCriteria().getId()));
						projectCriteria.setCategory(projectCategory);
						projectCategory.getProjectCriterias().add(projectCriteria);
					}
					
					// Remove existing
					if (projCrit.isRemoved()) {
						ProjectCriteria criteria = projectCriteriaRepo.findOne(projCrit.getId());
						projectCategory.getProjectCriterias().remove(criteria);
					}
				}
				projectCategories.add(projectCategory);
			}
			project.setProjectCategories(projectCategories);
			projectRepo.saveAndFlush(project);	
			
			logger.info("Successfully added categories to project " + project.getTitle() + " [" + project.getId() + "]");
			return new ResponseEntity<List<ProjectCategory>>(project.getProjectCategories(), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<List<ProjectCategory>>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
