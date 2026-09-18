package dev.asharam.portfolio.controller;

import dev.asharam.portfolio.dto.ContactRequest;
import dev.asharam.portfolio.dto.ContactResponse;
import dev.asharam.portfolio.service.ContactService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import java.time.Instant;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ContactController {

  private final ContactService contactService;

  public ContactController(ContactService contactService) {
    this.contactService = contactService;
  }

  @GetMapping("/health")
  public Map<String, String> health() {
    return Map.of("ok", "true", "time", Instant.now().toString());
  }

  @PostMapping("/contact")
  public ResponseEntity<ContactResponse> contact(
      @Valid @RequestBody ContactRequest req, HttpServletRequest http) {
    return ResponseEntity.ok(contactService.submit(req, http.getRemoteAddr()));
  }
}
