package dev.asharam.portfolio.service;

import java.time.Instant;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

/** Minimal token auth for the admin API. Password comes from env (ADMIN_PASSWORD).
 *  Tokens live in memory, expire after 12h. If no password is configured,
 *  login is disabled (safe default). */
@Service
public class AdminAuthService {

  private static final long TTL_MS = 12 * 60 * 60 * 1000L;
  private final String password;
  private final Map<String, Long> tokens = new ConcurrentHashMap<>();

  public AdminAuthService(@Value("${portfolio.admin.password:}") String password) {
    this.password = password == null ? "" : password;
  }

  public boolean enabled() {
    return !password.isBlank();
  }

  /** Returns a token on success, null on failure. */
  public String login(String attempt) {
    if (!enabled() || attempt == null || !attempt.equals(password)) {
      return null;
    }
    String token = UUID.randomUUID().toString();
    tokens.put(token, System.currentTimeMillis() + TTL_MS);
    return token;
  }

  public boolean valid(String header) {
    if (header == null || !header.startsWith("Bearer ")) {
      return false;
    }
    String token = header.substring(7);
    Long exp = tokens.get(token);
    if (exp == null) {
      return false;
    }
    if (Instant.now().toEpochMilli() > exp) {
      tokens.remove(token);
      return false;
    }
    return true;
  }
}
