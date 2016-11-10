package ch.fhnw.p2p.controller;

import java.util.Enumeration;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.tomcat.util.descriptor.web.LoginConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import ch.fhnw.p2p.entities.Login;
import ch.fhnw.p2p.repositories.LoginRepository;

@Controller
public class HomeController {
	
	private Log logger = LogFactory.getLog(this.getClass());
	
	@Autowired
	LoginRepository loginRepo;
	

	@RequestMapping(value = "/")
	public String index(HttpServletRequest request) {
		logger.info(request.getAttribute("cookie"));
		logger.info(request.getHeader("cookie"));
		logger.info(request.getHeader("user-agent"));
		logger.info(request.getHeader("mail"));
		Enumeration headerNames = request.getHeaderNames();
		
		while (headerNames.hasMoreElements()) {
			String headerName = (String) headerNames.nextElement();
			logger.info("" + headerName);
		}
		return "index";
	}

}
