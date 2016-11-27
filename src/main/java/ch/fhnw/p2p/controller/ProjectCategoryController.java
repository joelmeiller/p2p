package ch.fhnw.p2p.controller;

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
import ch.fhnw.p2p.entities.Project;
import ch.fhnw.p2p.entities.ProjectCategory;
import ch.fhnw.p2p.entities.User;
import ch.fhnw.p2p.repositories.ProjectCategoryRepositoryImpl;

/**
 * REST api controller for the categories collection
 *
 * @author Joel Meiller
 */

@Controller
@RequestMapping("/api/project")
public class ProjectCategoryController extends BaseController {
	// ------------------------
	// PRIVATE FIELDS
	// ------------------------
	private Log logger = LogFactory.getLog(this.getClass());
	
	@Autowired
	private AccessControl accessControl;
	

	@Autowired
	private ProjectCategoryRepositoryImpl projectRepoImpl;
	
	
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

		if (user.getMember().getProject().getStatus() == Project.Status.FINAL) {
			return new ResponseEntity<Set<ProjectCategory>>(HttpStatus.NOT_ACCEPTABLE); 
		}
		
		try {
			logger.info("Update criterias of project: " + user.getMember().getProject().getTitle() + "'");
			Project project = projectRepoImpl.updateProjectCategories(user.getMember().getProject(), updatedCategories);
			
			logger.info("Successfully updated criterias for project " + project.getTitle() + " [" + project.getId() + "]");
			return new ResponseEntity<Set<ProjectCategory>>(project.getProjectCategories(), HttpStatus.OK);
		} catch (Exception e) {
			logger.error("Server error", e);
			return new ResponseEntity<Set<ProjectCategory>>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
