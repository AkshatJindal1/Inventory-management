package org.inventorymanagement.product.exceptionhandler;

import java.util.ArrayList;
import java.util.List;

import org.inventorymanagement.product.exceptionhandler.Exceptions.DuplicateOptionNameException;
import org.inventorymanagement.product.exceptionhandler.Exceptions.DuplicateProductException;
import org.inventorymanagement.product.exceptionhandler.Exceptions.RequiredFieldsMissingException;
import org.inventorymanagement.product.exceptionhandler.Exceptions.FormNameNullException;
import org.inventorymanagement.product.exceptionhandler.Exceptions.FormNotFoundException;
import org.inventorymanagement.product.exceptionhandler.Exceptions.InsufficientPermissionException;
import org.inventorymanagement.product.exceptionhandler.Exceptions.OptionNotFoundException;
import org.inventorymanagement.product.exceptionhandler.Exceptions.ProductIdMismatchException;
import org.inventorymanagement.product.exceptionhandler.Exceptions.ProductNotFoundException;
import org.inventorymanagement.product.exceptionhandler.Exceptions.UnauthenticatedUserException;
import org.inventorymanagement.product.exceptionhandler.Exceptions.UserNotApprovedException;
import org.inventorymanagement.product.exceptionhandler.Exceptions.UserNotIdentifiedException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

	@ExceptionHandler({ UnauthenticatedUserException.class, InsufficientPermissionException.class,
			UserNotApprovedException.class, UserNotIdentifiedException.class })
	protected ResponseEntity<Object> unauthenticatedUser(Exception ex, WebRequest request) {

		final ApiError apiError = new ApiError(HttpStatus.FORBIDDEN, ex.getLocalizedMessage(),
				ex.getLocalizedMessage());

		return handleExceptionInternal(ex, apiError, new HttpHeaders(), HttpStatus.FORBIDDEN, request);
	}

	@ExceptionHandler({ ProductNotFoundException.class, OptionNotFoundException.class, FormNotFoundException.class })
	protected ResponseEntity<Object> handleNotFound(Exception ex, WebRequest request) {

		final ApiError apiError = new ApiError(HttpStatus.NOT_FOUND, ex.getLocalizedMessage(),
				ex.getLocalizedMessage());

		return handleExceptionInternal(ex, apiError, new HttpHeaders(), HttpStatus.NOT_FOUND, request);
	}

	@ExceptionHandler({ ProductIdMismatchException.class, DataIntegrityViolationException.class,
			FormNameNullException.class, RequiredFieldsMissingException.class, DuplicateOptionNameException.class,
			DuplicateProductException.class })
	public ResponseEntity<Object> handleBadRequest(Exception ex, WebRequest request) {

		final ApiError apiError = new ApiError(HttpStatus.BAD_REQUEST, ex.getLocalizedMessage(),
				ex.getLocalizedMessage());

		return handleExceptionInternal(ex, apiError, new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
	}

	@Override
	protected ResponseEntity<Object> handleMethodArgumentNotValid(final MethodArgumentNotValidException ex,
			final HttpHeaders headers, final HttpStatus status, final WebRequest request) {

		final List<String> errors = new ArrayList<>();
		for (final FieldError error : ex.getBindingResult().getFieldErrors()) {
			errors.add(error.getField() + ": " + error.getDefaultMessage());
		}
		for (final ObjectError error : ex.getBindingResult().getGlobalErrors()) {
			errors.add(error.getObjectName() + ": " + error.getDefaultMessage());
		}
		final ApiError apiError = new ApiError(HttpStatus.BAD_REQUEST, ex.getLocalizedMessage(), errors);
		return handleExceptionInternal(ex, apiError, headers, apiError.getStatus(), request);
	}

	@ExceptionHandler({ MethodArgumentTypeMismatchException.class })
	public ResponseEntity<Object> handleMethodArgumentTypeMismatch(MethodArgumentTypeMismatchException ex,
			WebRequest request) {
		String error = ex.getName() + " should be of type " + ex.getRequiredType().getName();

		ApiError apiError = new ApiError(HttpStatus.BAD_REQUEST, ex.getLocalizedMessage(), error);
		return new ResponseEntity<>(apiError, new HttpHeaders(), apiError.getStatus());
	}

	@Override
	protected ResponseEntity<Object> handleHttpMessageNotReadable(HttpMessageNotReadableException ex,
			HttpHeaders headers, HttpStatus status, WebRequest request) {

		String error = "Malformed JSON request";
		ApiError apiError = new ApiError(HttpStatus.BAD_REQUEST, ex.getLocalizedMessage(), error);
		return new ResponseEntity<>(apiError, new HttpHeaders(), apiError.getStatus());
	}

	@Override
	protected ResponseEntity<Object> handleHttpRequestMethodNotSupported(HttpRequestMethodNotSupportedException ex,
			HttpHeaders headers, HttpStatus status, WebRequest request) {
		StringBuilder builder = new StringBuilder();
		builder.append(ex.getMethod());
		builder.append(" method is not supported for this request. Supported methods are ");
		ex.getSupportedHttpMethods().forEach(t -> builder.append(t + " "));

		ApiError apiError = new ApiError(HttpStatus.METHOD_NOT_ALLOWED, ex.getLocalizedMessage(), builder.toString());
		return new ResponseEntity<Object>(apiError, new HttpHeaders(), apiError.getStatus());
	}

	@ExceptionHandler({ Exception.class })
	public ResponseEntity<Object> handleAll(Exception ex, WebRequest request) {
		ApiError apiError = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, ex.getLocalizedMessage(), "error occurred");
		return new ResponseEntity<Object>(apiError, new HttpHeaders(), apiError.getStatus());
	}

}
