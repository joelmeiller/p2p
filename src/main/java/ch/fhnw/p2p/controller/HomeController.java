package ch.fhnw.p2p.controller;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

import ch.fhnw.p2p.authorization.AccessControl;
import ch.fhnw.p2p.entities.Login;


@Controller
@CrossOrigin(origins = { "http://localhost:3000", "https://www.cs.technik.fhnw.ch" })
public class HomeController {
	
	private Log logger = LogFactory.getLog(this.getClass());

	@Autowired
	private AccessControl accessControl;

	@RequestMapping(value = "/")
	public String index(HttpServletRequest request, Model model) {
		Login ticket = accessControl.getTicket(request);

		logger.info("Request of web app (index.html)");
		if (ticket != null) {
			model.addAttribute("ticket", ticket.getTicket());
			logger.info("user=" + ticket.getEmail() + " ticket=" + ticket.getTicket());
		}

		return "index";
	}
}
