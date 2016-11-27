package ch.fhnw.p2p.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;

import lombok.Data;

/**
 * Gemeinsame funktionalität wie Exception handling.
 * 
 * From http://stackoverflow.com/questions/16232833/how-to-respond-with-http-400-error-in-a-spring-mvc-responsebody-method-returnin
 */
@CrossOrigin(origins = { "http://localhost:3000", "https://www.cs.technik.fhnw.ch" })
public class BaseController {
	
	static class BadRequestException extends RuntimeException {
		BadRequestException(String message) {
			super(message);
		}
	}
	
	static class NotFoundException extends RuntimeException {
		NotFoundException(String message) {
			super(message);
		}
	}

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
		return new ResponseEntity<ApiResponse>(new ApiResponse(e), HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler({NotFoundException.class})
	ResponseEntity<ApiResponse> handleNotFoundException(NotFoundException e) {
		return new ResponseEntity<ApiResponse>(new ApiResponse(e), HttpStatus.NOT_FOUND);
	}
}
