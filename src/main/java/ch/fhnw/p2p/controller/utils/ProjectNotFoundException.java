package ch.fhnw.p2p.controller.utils;

import org.apache.commons.logging.Log;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import ch.fhnw.p2p.entities.Member;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ProjectNotFoundException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public ProjectNotFoundException(Member member, Log logger) {
		super("could not find project for member '" + member.getStudent().getFirstName() + " " + member.getStudent().getLastName() + "'.");
		logger.info("No project found");
	}
}