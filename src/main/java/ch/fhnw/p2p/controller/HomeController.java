package ch.fhnw.p2p.controller;

import java.util.Enumeration;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {

	@RequestMapping(value = "/")
	public String index(HttpServletRequest request) {
		System.out.println(request.getAttribute("Shib-Identity-Provider"));
		System.out.println(request.getHeader("Shib-Identity-Provider"));
		Enumeration headerNames = request.getHeaderNames();
		
		while (headerNames.hasMoreElements()) {
			String headerName = (String) headerNames.nextElement();
			System.out.println("" + headerName);
			System.out.println("" + request.getHeader(headerName));
		}
		return "index";
	}

}
