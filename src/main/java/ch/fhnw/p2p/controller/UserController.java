package ch.fhnw.p2p.controller;

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

import ch.fhnw.p2p.authorization.AccessControl;
import ch.fhnw.p2p.entities.User;
import ch.fhnw.p2p.entities.mapping.UserSettings;

/**
 * REST api controller to handle user
 *
 * @author Joel Meiller
 */
@Controller
@RequestMapping("/api/user")
public class UserController extends BaseController {
	// ------------------------
	// PRIVATE FIELDS
	// ------------------------
	private Log logger = LogFactory.getLog(this.getClass());

	@Autowired
	private AccessControl accessControl;

	// ------------------------
	// PUBLIC METHODS
	// ------------------------
	
	/**
	 * returns user, role and project settings and the current rating state
	 * 
	 * @return the user settings
	 */
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value="/settings", method = RequestMethod.GET)
	public ResponseEntity<UserSettings> getUserSettings(HttpServletRequest request) {
		logger.info("GET Request for user/settings");
		User user = accessControl.login(request, AccessControl.Allowed.ALL);	
				
		logger.info("Successfully read user/settings for " + user.toString());
		return new ResponseEntity<UserSettings>(new UserSettings(user), HttpStatus.OK);
	}
}
