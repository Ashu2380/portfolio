package dev.asharam.portfolio.controller;

import dev.asharam.portfolio.service.AdminAuthService;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/admin")
public class UploadController {

  private static final Set<String> ALLOWED_TYPES =
      Set.of("image/png", "image/jpeg", "image/webp", "image/gif", "image/svg+xml");
  private static final long MAX_BYTES = 5L * 1024 * 1024;

  private final AdminAuthService auth;

  public UploadController(AdminAuthService auth) {
    this.auth = auth;
  }

  /** Admin-only image upload. Returns {ok, url} where url is served under /uploads/. */
  @PostMapping("/upload")
  public ResponseEntity<Map<String, Object>> upload(
      @RequestParam("file") MultipartFile file,
      @RequestHeader(value = "Authorization", required = false) String authHeader) {
    if (!auth.valid(authHeader)) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
          .body(Map.of("ok", false, "error", "Login required"));
    }
    if (file == null || file.isEmpty()) {
      return ResponseEntity.badRequest().body(Map.of("ok", false, "error", "No file received"));
    }
    String type = file.getContentType();
    if (type == null || !ALLOWED_TYPES.contains(type.toLowerCase())) {
      return ResponseEntity.badRequest()
          .body(Map.of("ok", false, "error", "Only PNG, JPG, WEBP, GIF or SVG images allowed"));
    }
    if (file.getSize() > MAX_BYTES) {
      return ResponseEntity.badRequest()
          .body(Map.of("ok", false, "error", "Image must be under 5 MB"));
    }
    try {
      Path dir = Paths.get("uploads");
      Files.createDirectories(dir);
      String ext =
          switch (type.toLowerCase()) {
            case "image/png" -> ".png";
            case "image/webp" -> ".webp";
            case "image/gif" -> ".gif";
            case "image/svg+xml" -> ".svg";
            default -> ".jpg";
          };
      String name = UUID.randomUUID().toString().substring(0, 8) + ext;
      Files.write(dir.resolve(name), file.getBytes());
      return ResponseEntity.ok(Map.of("ok", true, "url", "/uploads/" + name));
    } catch (IOException ex) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body(Map.of("ok", false, "error", "Could not store image"));
    }
  }
}
