package dev.asharam.portfolio.exception;

import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MultipartException;
import org.springframework.web.multipart.support.MissingServletRequestPartException;

@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<Map<String, Object>> handleValidation(MethodArgumentNotValidException ex) {
    String msg =
        ex.getBindingResult().getAllErrors().stream()
            .map(DefaultMessageSourceResolvable::getDefaultMessage)
            .distinct()
            .collect(Collectors.joining("; "));
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("ok", false, "error", msg));
  }

  @ExceptionHandler({MultipartException.class, MissingServletRequestPartException.class})
  public ResponseEntity<Map<String, Object>> handleUpload(Exception ex) {
    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
        .body(Map.of("ok", false, "error", "Send an image file as 'file' (PNG/JPG/WEBP/GIF/SVG, max 5 MB)"));
  }
}
