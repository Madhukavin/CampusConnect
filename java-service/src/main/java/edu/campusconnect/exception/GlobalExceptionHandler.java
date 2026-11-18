package edu.campusconnect.exception;

import java.util.Map;
import org.springframework.http.*;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

@RestControllerAdvice
public class GlobalExceptionHandler {
  @ExceptionHandler(EventFullException.class)
  public ResponseEntity<Map<String, String>> full(EventFullException e) {
    return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("message", e.getMessage()));
  }

  @ExceptionHandler(IllegalArgumentException.class)
  public ResponseEntity<Map<String, String>> invalid(IllegalArgumentException e) {
    return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<Map<String, String>> validation(MethodArgumentNotValidException e) {
    String message =
        e.getBindingResult().getFieldErrors().stream()
            .findFirst()
            .map(error -> error.getField() + " " + error.getDefaultMessage())
            .orElse("Invalid registration request");
    return ResponseEntity.badRequest().body(Map.of("message", message));
  }
}
