package ch.fhnw.p2p.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import ch.fhnw.p2p.authorization.AccessControl;
import ch.fhnw.p2p.entities.User;
import ch.fhnw.p2p.repositories.UserRepository;

/**
 * A class to test interactions with the MySQL database using the
 * StudentRepository class.
 *
 * @author Joel Meiller
 */
@Controller
@RequestMapping("/api/students")
public class StudentController {
	
	// ------------------------
	// PRIVATE FIELDS
	// ------------------------
	private Log logger = LogFactory.getLog(this.getClass());
	
	@Autowired
	private AccessControl accessControl;
	
	@Autowired
	UserRepository studentRepo;
	
	
	// ------------------------
	// PUBLIC METHODS
	// ------------------------

	/**
	 * /suggestions --> Get suggestions depending on search pattern
	 * 
	 * @param pattern
	 *            search pattern to search in first name, last name and email
	 * @return list of the maximal first 7 students found by the search pattern.
	 */
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value = "/suggestions", params = "pattern", method = RequestMethod.GET)
	public ResponseEntity<List<User>> getStudentSuggestions(HttpServletRequest request, @RequestParam String pattern) {
		logger.info("GET Request for students/suggestions");
		accessControl.login(request, AccessControl.Allowed.QM_OR_COACH);

		logger.info("Get students by pattern: '" + pattern + "'");
		return new ResponseEntity<List<User>>(studentRepo.findSuggestions(pattern.toLowerCase()), HttpStatus.OK);
	}
}
