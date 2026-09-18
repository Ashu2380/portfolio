package dev.asharam.portfolio.controller;

import dev.asharam.portfolio.service.AdminAuthService;
import dev.asharam.portfolio.service.ContentService;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class AdminController {

  private final AdminAuthService auth;
  private final ContentService content;

  public AdminController(AdminAuthService auth, ContentService content) {
    this.auth = auth;
    this.content = content;
  }

  /** Public: whole site content (only sections customized via admin). */
  @GetMapping("/content")
  public Map<String, Object> content() {
    return content.all();
  }

  public record LoginRequest(String password) {}

  @PostMapping("/admin/login")
  public ResponseEntity<Map<String, Object>> login(@RequestBody LoginRequest req) {
    if (!auth.enabled()) {
      return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
          .body(Map.of("ok", false, "error", "Admin login is not configured yet"));
    }
    String token = auth.login(req == null ? null : req.password());
    if (token == null) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
          .body(Map.of("ok", false, "error", "Wrong password"));
    }
    return ResponseEntity.ok(Map.of("ok", true, "token", token));
  }

  @PutMapping("/admin/content/{section}")
  public ResponseEntity<Map<String, Object>> save(
      @PathVariable String section,
      @RequestBody Map<String, Object> body,
      @RequestHeader(value = "Authorization", required = false) String authHeader) {
    if (!auth.valid(authHeader)) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
          .body(Map.of("ok", false, "error", "Login required"));
    }
    Object payload = body == null ? null : body.get("payload");
    try {
      content.save(section, payload == null ? null : String.valueOf(payload));
      return ResponseEntity.ok(Map.of("ok", true));
    } catch (IllegalArgumentException ex) {
      return ResponseEntity.badRequest().body(Map.of("ok", false, "error", ex.getMessage()));
    }
  }
}
