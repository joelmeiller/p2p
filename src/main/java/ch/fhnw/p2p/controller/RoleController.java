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
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import ch.fhnw.p2p.entities.Role;
import ch.fhnw.p2p.repositories.RoleRepository;

/**
 * REST api controller to handle the roles
 *
 * @author Joel Meiller
 */
@Controller
@RequestMapping("/api/roles")
public class RoleController extends BaseController {
	// ------------------------
	// PRIVATE FIELDS
	// ------------------------
	private Log logger = LogFactory.getLog(this.getClass());

	@Autowired
	private RoleRepository repository;

	// ------------------------
	// PUBLIC METHODS
	// ------------------------
	
	/**
	 * Returns all active roles.
	 * 
	 * @return List of roles
	 */
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value="/active", method = RequestMethod.GET)
	public ResponseEntity<List<Role>> getAllRoles() {
		List<Role> roles = repository.findAll();
		if ((roles == null) || (roles.isEmpty())) {
			logger.debug("No roles found");
			return new ResponseEntity<List<Role>>(HttpStatus.NO_CONTENT);
		} else {
			logger.debug("Successfully read " + roles.size() + " Roles");
			return new ResponseEntity<List<Role>>(roles, HttpStatus.OK);
		}
	}

	/**
	 * Add new role
	 * 
	 * @param role to be inserted
	 * @return The created role
	 */
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<Role> saveRole(@Valid @RequestBody Role role, BindingResult result) {
		// TODO: Add access control to restrict adding new roles to coaches only
		if (result.hasErrors()) {
			return new ResponseEntity<Role>(HttpStatus.PRECONDITION_FAILED);
		}
		try {
			role = repository.save(role);
			logger.debug("Successfully saved role[" + role.getId() + "] with content '" + role.toString() + "'");
			return new ResponseEntity<Role>(role, HttpStatus.OK);
		} catch (Exception e) {
			logger.error("Server error", e);
			return new ResponseEntity<Role>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
