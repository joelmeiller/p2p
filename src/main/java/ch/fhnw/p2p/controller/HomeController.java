package ch.fhnw.p2p.controller;

import java.util.Enumeration;

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
		logger.info(request.getAttribute("Shib-Identity-Provider"));
		logger.info(request.getHeader("Shib-Identity-Provider"));
		Enumeration headerNames = request.getHeaderNames();
		
		while (headerNames.hasMoreElements()) {
			String headerName = (String) headerNames.nextElement();
			logger.info("" + headerName);
		}
		return "index";
	}

}
