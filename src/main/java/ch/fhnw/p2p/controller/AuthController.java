package ch.fhnw.p2p.controller;

import java.util.Date;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import ch.fhnw.p2p.authorization.AccessControl;
import ch.fhnw.p2p.controller.utils.BadRequestException;
import ch.fhnw.p2p.controller.utils.NotAllowedException;
import ch.fhnw.p2p.controller.utils.NotFoundException;
import ch.fhnw.p2p.entities.Login;
import ch.fhnw.p2p.entities.User;
import ch.fhnw.p2p.repositories.LoginRepository;
import lombok.Data;

@RestController
@RequestMapping("/api/auth")
public class AuthController extends BaseController {
	
	@Data
	static class AuthStatus {
		private boolean loggedIn;
		private String activeProfile;
	}
	
	@Data
	static class ImpersonationRequest {
		private String impersonatedEmail;
	}

	@Data
	static class TicketLoginRequest {
		private String ticket;
	}

	private Log logger = LogFactory.getLog(this.getClass());

	@Value("${spring.profiles.active}")
	private String activeProfile;

	@Autowired
	private AccessControl accessControl;
	
	@Autowired
	private LoginRepository loginRepo;
	
	@RequestMapping(value = "impersonate", method = RequestMethod.POST)
	public ResponseEntity<ApiResponse> impersonate(HttpServletRequest request, @Valid @RequestBody ImpersonationRequest data, BindingResult result) {
		if (result.hasErrors()) throw new BadRequestException("Invalid object");
		String mail = data.getImpersonatedEmail();
		User user = accessControl.impersonate(request, mail);
		if (user == null) throw new BadRequestException("Could not impersonate " + mail);
		logger.info("Impersonated user=" + mail);
		return ApiResponse.create("Sucessfully impersonated " + user.getEmail());
	}
	
	@RequestMapping(value = "login", method = RequestMethod.POST)
	public ResponseEntity<ApiResponse> login(HttpServletRequest request, @Valid @RequestBody TicketLoginRequest data, BindingResult result) {
		if (result.hasErrors()) throw new BadRequestException("Invalid object");
		Optional<Login> login = loginRepo.findByTicket(data.getTicket());
		if (!login.isPresent()) throw new NotFoundException("Could not find ticket");
		if (new Date().getTime() - login.get().getCreatedTSD().getTime() > 1000 * 60) {
			throw new NotAllowedException("Ticket too old: " + login.get().getCreatedTSD());
		}
		User user = accessControl.impersonate(request, login.get().getEmail());
		if (user == null) throw new BadRequestException("Could not impersonate " + login.get().getEmail());
		logger.info("Logged in using ticket user=" + login.get().getEmail());
		return ApiResponse.create("Sucessfully logged in " + user.getEmail());
	}

	@RequestMapping(value = "logout", method = RequestMethod.GET)
	public ResponseEntity<ApiResponse> logout(HttpServletRequest request) {
		User user = accessControl.login(request);
		if (user == null) {
			return ApiResponse.create("Not logged in");
		}
		accessControl.logout(request);
		logger.info("Logged out user=" + user.getEmail());
		return ApiResponse.create("Sucesfully logged out");
	}
	
	@RequestMapping(value = "status", method = RequestMethod.GET)
	public ResponseEntity<AuthStatus> status(HttpServletRequest request) {
		User user = accessControl.login(request);
		logger.info("Auth status user=" + (user == null ? null : user.getEmail()));
		AuthStatus status = new AuthStatus();
		status.setLoggedIn(user != null);
		status.setActiveProfile(activeProfile);
		return new ResponseEntity<AuthStatus>(status, HttpStatus.OK);
	}
}
