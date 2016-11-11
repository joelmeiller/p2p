package ch.fhnw.p2p.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
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

import ch.fhnw.p2p.authorization.AccessControl;
import ch.fhnw.p2p.entities.Category;
import ch.fhnw.p2p.entities.Criteria;
import ch.fhnw.p2p.entities.Locale;
import ch.fhnw.p2p.entities.Project;
import ch.fhnw.p2p.entities.ProjectCategory;
import ch.fhnw.p2p.entities.ProjectCriteria;
import ch.fhnw.p2p.entities.User;
import ch.fhnw.p2p.repositories.CriteriaRepository;
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
	private AccessControl accessControl;
	
	@Autowired
	private ProjectRepository projectRepo;
	
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
	public ResponseEntity<Set<ProjectCategory>> getProjectCriterias(HttpServletRequest request) {
		logger.info("GET Request for project/categories");
		User user = accessControl.login(request, AccessControl.Allowed.QM);
		
		logger.info("Successfully read project/categories for project " + user.getMember().getProject().toString());
		return new ResponseEntity<Set<ProjectCategory>>(user.getMember().getProject().getProjectCategories(), HttpStatus.OK);
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value = "/categories", method = RequestMethod.POST)
	public ResponseEntity<Set<ProjectCategory>> add(HttpServletRequest request, @Valid @RequestBody List<ProjectCategory> updatedCategories, BindingResult result) {
		logger.info("POST Request for project/categories");
		User user = accessControl.login(request, AccessControl.Allowed.QM);
		
		if (result.hasErrors()) {
			logger.error(result);
			return new ResponseEntity<Set<ProjectCategory>>(HttpStatus.PRECONDITION_FAILED);
		}

		try {
			logger.info("Save Categories for student: " + user.toString());
			Project project = user.getMember().getProject();
						
			Set<ProjectCategory> projectCategories = new HashSet<ProjectCategory>();
			// Set categories and criterias
			for (ProjectCategory projCat: updatedCategories) {
				ProjectCategory projectCategory = projectCategoryRepo.findOne(projCat.getId());
						
				for (ProjectCriteria projCrit: projCat.getProjectCriterias()) {
					// Add new
					if (projCrit.isAdded()) {
						if (projectCategory.getCategory().getType() == Category.Type.SELFDEFINED) {
							logger.info("Add self-defined criteria");
							Criteria criteria = new Criteria(projCrit.getCriteria().getLabel(), Locale.Language.EN);
							criteria.setCategory(projectCategory.getCategory());
							criteria = criteriaRepo.save(criteria);
							
							ProjectCriteria projectCriteria = new ProjectCriteria(criteria);
							projectCriteria.setCategory(projectCategory);
							projectCategory.getProjectCriterias().add(projectCriteria);
						} else {
							ProjectCriteria projectCriteria = new ProjectCriteria(criteriaRepo.findOne(projCrit.getCriteria().getId()));
							projectCriteria.setCategory(projectCategory);
							projectCategory.getProjectCriterias().add(projectCriteria);
						}
					}
					
					// Remove existing
					if (projCrit.isRemoved()) {
						logger.info("Remove criteria (id='" + projCrit.getId() + "'");
						ProjectCriteria criteria = projectCriteriaRepo.findOne(projCrit.getId());
						projectCategory.getProjectCriterias().remove(criteria);
					// Update criteria
					} else if (projectCategory.getCategory().getType() == Category.Type.SELFDEFINED && projCrit.isUpdated()) {
						logger.info("Update criteria (id='" + projCrit.getId() + "'");
						Criteria criteria = criteriaRepo.findOne(projCrit.getCriteria().getId());
						criteria.setLabel(projCrit.getCriteria().getLabel());
						criteriaRepo.save(criteria);
					}
				}
				projectCategories.add(projectCategory);
			}
			project.setProjectCategories(projectCategories);
			projectRepo.saveAndFlush(project);	
			
			logger.info("Successfully added categories to project " + project.getTitle() + " [" + project.getId() + "]");
			return new ResponseEntity<Set<ProjectCategory>>(project.getProjectCategories(), HttpStatus.OK);
		} catch (Exception e) {
			logger.error("Server error", e);
			return new ResponseEntity<Set<ProjectCategory>>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
