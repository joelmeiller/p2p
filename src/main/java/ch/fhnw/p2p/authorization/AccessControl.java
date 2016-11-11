package ch.fhnw.p2p.authorization;

import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.stereotype.Component;

import ch.fhnw.p2p.controller.utils.NotAllowedException;
import ch.fhnw.p2p.entities.Member;
import ch.fhnw.p2p.entities.User;
import ch.fhnw.p2p.repositories.MemberRepository;
import ch.fhnw.p2p.repositories.UserRepository;

@Component
public class AccessControl {
	
	public static enum Allowed {
		QM,
		COACH,
		ALL,
		MEMBER,
	};
	
	private Log logger = LogFactory.getLog(this.getClass());
	
	private User user;
	
	@Autowired
	MemberRepository memberRepo;
	
	@Autowired
	UserRepository userRepo;
	
	AccessControl() {}

	/**
	 * checks if the user exists by searching for the email provided by AAI login
	 * @return User
	 * @throws NotAllowedException 
	 */
	private User checkUser(HttpServletRequest request) throws NotAllowedException {
		String requestMail = request.getHeader("mail");
		logger.info("Request access for " + requestMail);
		String mail = requestMail != null && !requestMail.equals("") ? requestMail : "max.muster@students.fhnw.ch";
		Optional<User> userCheck = userRepo.findByEmail(mail);
		
				
		if (userCheck.isPresent()) {
			this.user = userCheck.get();
		} else {
			logger.error("User not not found");
			throw new NotAllowedException(mail);
		}
		
		if (!this.user.isCoach()) {
			Member member = memberRepo.findByStudentEmail(mail);
			
			if (member != null) {
				if (member.getProject() == null) {
					logger.error("Project not found for member with id = " + member.getId());
					throw new NotAllowedException("Could not find project for member '" + member.getStudent().getFirstName() + " " + member.getStudent().getLastName() + "'.");
				}
				
				this.user.setMember(member);
			}
		}
		
		logger.info("Successful request of user  " + this.user.toString() + (user.getMember() != null ? " for project " + user.getMember().getProject().getTitle() : ""));
		
		return this.user;
	}
	
	private boolean checkRequest(Allowed allowed) {
		switch(allowed) {
		case QM:
			return user.isQM();
		case COACH:
			return user.isCoach();
		case MEMBER:
			return !user.isCoach();
		default:
			return true;
		}
	}
	
	/**
	 * checks if the user exists by searching for the email provided by AAI login
	 * @return boolean indicating wether the user is allowed to use the app or not
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
		login(request);
		
		if (!checkRequest(allowed)) throw new NotAllowedException("request not allowed due to the user rights");
		
		return user;
	}
}
