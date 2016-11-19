package ch.fhnw.p2p.controller;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
public class HomeController {
	
	private Log logger = LogFactory.getLog(this.getClass());


	@RequestMapping(value = "/")
	public String index(HttpServletRequest request) {
		logger.info("Request of web app (index.html) for " + request.getHeader("mail"));
		
		return "index";
	}

}
