package ch.fhnw.p2p.controller;

import java.util.ArrayList;
import java.util.Collection;
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

import ch.fhnw.p2p.entities.Member;
import ch.fhnw.p2p.entities.Project;
import ch.fhnw.p2p.entities.ProjectCriteria;
import ch.fhnw.p2p.entities.Role;
import ch.fhnw.p2p.repositories.CategoryRepository;
import ch.fhnw.p2p.repositories.MemberRepository;
import ch.fhnw.p2p.repositories.ProjectRepository;
import ch.fhnw.p2p.repositories.RoleRepository;
import ch.fhnw.p2p.repositories.StudentRepository;

/**
 * REST api controller for the categories collection
 *
 * @author Joel Meiller
 */
@Controller
@RequestMapping("/categories")
public class ProjectController {
	// ------------------------
	// PRIVATE FIELDS
	// ------------------------
	private Log log = LogFactory.getLog(this.getClass());

	private ProjectRepository projectRepo;
	
	@Autowired
	private MemberRepository memberRepo;
	
	@Autowired
	private StudentRepository studentRepo;

	// ------------------------
	// PUBLIC METHODS
	// ------------------------
	
	/**
	 * /findAll --> Returns all project related categories and criterias.
	 * 
	 * @return A list of criterias
	 */
//	@RequestMapping(value = "/categories", method = RequestMethod.GET)
//	public ResponseEntity<Project> getProjectCriterias() {
//		// TODO: This is the access control section which should be in a separate class
//		Member member = memberRepo.findByStudent(studentRepo.findByEmail("max.muster@test.ch"));
//		Project project = projectRepo.findByIdAndStatus(member.getProject().getId(), Project.Status.OPEN);
//
//		
//		if (project == null) {
//			log.debug("No project found");
//			return new ResponseEntity<Project>(HttpStatus.NO_CONTENT);
//		} else {
//			log.debug("Successfully read " + project.getTitle());
//			return new ResponseEntity<Project>(project, HttpStatus.OK);
//		}
//	}
}
