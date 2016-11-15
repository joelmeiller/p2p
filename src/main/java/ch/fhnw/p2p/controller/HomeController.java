package ch.fhnw.p2p.controller;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import ch.fhnw.p2p.entities.Login;
import ch.fhnw.p2p.repositories.LoginRepository;

@Controller
public class HomeController {
	
	private Log logger = LogFactory.getLog(this.getClass());
	
	@Autowired
	LoginRepository loginRepo;


	@RequestMapping(value = "/")
	public String index(HttpServletRequest request, @RequestParam("email") String email) {
		logger.info(request.getHeader("mail") + " or " + email);
		
		// Test reasons only
		if (email != null) {
			loginRepo.deleteAll();
			loginRepo.saveAndFlush(new Login(email));
		}
		
		return "index";
	}

}
