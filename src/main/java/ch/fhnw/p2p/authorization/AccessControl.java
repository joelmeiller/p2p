package ch.fhnw.p2p.authorization;

import java.math.BigInteger;
import java.security.SecureRandom;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import ch.fhnw.p2p.controller.utils.NotAllowedException;
import ch.fhnw.p2p.entities.Login;
import ch.fhnw.p2p.entities.Member;
import ch.fhnw.p2p.entities.User;
import ch.fhnw.p2p.repositories.LoginRepository;
import ch.fhnw.p2p.repositories.MemberRepository;
import ch.fhnw.p2p.repositories.UserRepository;

@Component
public class AccessControl {
	
	public static enum Allowed {
		ALL,
		COACH,
		MEMBER,
		QM,
		QM_OR_COACH,
	};
	
	private Log logger = LogFactory.getLog(this.getClass());
	private SecureRandom random = new SecureRandom();
	
	@Autowired
	MemberRepository memberRepo;
	
	@Autowired
	UserRepository userRepo;
	
	@Autowired
	private LoginRepository loginRepo;

	AccessControl() {}

	private void invalidateLogin(HttpServletRequest request) {
		request.getSession().invalidate();
		logger.debug("Invalidated cookie session");
	}

	private void setLogin(HttpServletRequest request, String mail) {
		logger.info("Setting cookie for user=" + mail);
		request.getSession().setAttribute("mail", mail);
		request.getSession().setMaxInactiveInterval(10 * 60);
	}

	public Login getTicket(HttpServletRequest request) {
		String mail = request.getHeader("mail");
		if (mail == null) {
			return null;
		}
		Login login = new Login();
		login.setEmail(mail);
		login.setTicket(new BigInteger(130, random).toString(32));
		loginRepo.save(login);
		return login;
	}

	/**
	 * checks if the user exists by searching for the email provided by AAI login
	 * @return User
	 * @throws NotAllowedException 
	 */
	private User checkUser(HttpServletRequest request) throws NotAllowedException {
		String mail = request.getHeader("mail");

		if (mail != null) {
			setLogin(request, mail);
		} else {
			mail = (String) request.getSession().getAttribute("mail");
			logger.debug("Cookie user=" + mail);
			if (mail == null) {
				return null;
			}
		}

		Optional<User> userCheck = userRepo.findByEmail(mail);
		if (!userCheck.isPresent()) {
			logger.error("No user found with email " + mail);
			return null;
		}
		User user = userCheck.get();

		if (!user.isCoach()) {
			Member member = memberRepo.findByStudentEmail(mail);
			
			if (member != null) {
				if (member.getProject() == null) {
					logger.error("Project not found for member with id = " + member.getId());
					throw new NotAllowedException("Could not find project for member '" + member.getStudent().getFirstName() + " " + member.getStudent().getLastName() + "'.");
				}
				
				user.setMember(member);
			}
		}
		
		logger.info("Successful request of user  " + user.toString()
				+ (user.getMember() != null ? " for project " + user.getMember().getProject().getTitle() : ""));
		
		return user;
	}
	
	private boolean checkRequest(User user, Allowed allowed) {
		switch(allowed) {
		case QM:
			return user.isQM();
		case COACH:
			return user.isCoach();
		case QM_OR_COACH:
			return user.isCoach() || user.isQM();
		case MEMBER:
			return !user.isCoach();
		default:
			return true;
		}
	}

	public User impersonate(HttpServletRequest request, String mail) throws NotAllowedException {
		setLogin(request, mail);
		return checkUser(request);
	}

	/**
	 * checks if the user exists by searching for the email provided by AAI
	 * login
	 * 
	 * @return User logged in to the system, or null.
	 * @throws NotAllowedException
	 */
	public User login(HttpServletRequest request) throws NotAllowedException {
		return checkUser(request);
	}
	
	/**
	 * checks if the user exists by searching for the email provided by AAI login
	 * @return logged in user with related rights
	 * @throws NotAllowedException 
	 */
	public User login(HttpServletRequest request, Allowed allowed) throws NotAllowedException {
		User user = login(request);

		if (user == null)
			throw new NotAllowedException("request not allowed due to missing login");
		if (!checkRequest(user, allowed))
			throw new NotAllowedException("request not allowed due to the user rights");

		return user;
	}

	public void logout(HttpServletRequest request) {
		invalidateLogin(request);
	}
}
