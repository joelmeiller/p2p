package ch.fhnw.p2p.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;

import ch.fhnw.p2p.controller.utils.BadRequestException;
import ch.fhnw.p2p.controller.utils.NotAllowedException;
import ch.fhnw.p2p.controller.utils.NotFoundException;
import lombok.Data;

/**
 * Common functionalities of controllers
 * - Exception handling
 * 
 * From http://stackoverflow.com/questions/16232833/how-to-respond-with-http-400-error-in-a-spring-mvc-responsebody-method-returnin
 */
@CrossOrigin(origins = { "http://localhost:3000", "https://www.cs.technik.fhnw.ch" })
public class BaseController {
	
	@Data
	static class ApiResponse {
		private boolean ok = true;
		private String message;
		ApiResponse(String message) {
			this.message = message;
		}
		ApiResponse(Exception e) {
			this(e.getMessage());
			this.ok = false;
		}
		static ResponseEntity<ApiResponse> create(String message) {
			return new ResponseEntity<ApiResponse>(new ApiResponse(message), HttpStatus.OK);
		}
	}

	@ExceptionHandler({BadRequestException.class})
	ResponseEntity<ApiResponse> handleBadRequestException(BadRequestException e) {
		e.printStackTrace();
		return new ResponseEntity<ApiResponse>(new ApiResponse(e), HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler({NotFoundException.class})
	ResponseEntity<ApiResponse> handleNotFoundException(NotFoundException e) {
		e.printStackTrace();
		return new ResponseEntity<ApiResponse>(new ApiResponse(e), HttpStatus.NOT_FOUND);
	}

	@ExceptionHandler({NotAllowedException.class})
	ResponseEntity<ApiResponse> handleNotFoundException(NotAllowedException e) {
		e.printStackTrace();
		return new ResponseEntity<ApiResponse>(new ApiResponse(e), HttpStatus.FORBIDDEN);
	}
}
