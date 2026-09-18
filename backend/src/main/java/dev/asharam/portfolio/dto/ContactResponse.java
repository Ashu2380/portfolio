package dev.asharam.portfolio.dto;

import java.time.Instant;
import java.util.UUID;

/** Outgoing payload after a message is stored. */
public record ContactResponse(boolean ok, String id, long total, String receivedAt) {
  public static ContactResponse success(String id, long total) {
    return new ContactResponse(true, id, total, Instant.now().toString());
  }

  public static String newId() {
    return UUID.randomUUID().toString().substring(0, 8);
  }
}
