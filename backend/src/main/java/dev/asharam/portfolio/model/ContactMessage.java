package dev.asharam.portfolio.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.Instant;

/** One contact-form message, persisted in H2 via Spring Data JPA. */
@Entity
@Table(name = "contact_messages")
public class ContactMessage {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long dbId;

  @Column(nullable = false, length = 12, unique = true)
  private String publicId;

  @Column(nullable = false, length = 100)
  private String name;

  @Column(nullable = false, length = 160)
  private String email;

  @Column(nullable = false, length = 200)
  private String subject;

  @Column(nullable = false, length = 5000)
  private String message;

  @Column(length = 64)
  private String ip;

  @Column(nullable = false)
  private Instant receivedAt;

  protected ContactMessage() {}

  public ContactMessage(
      String publicId, String name, String email, String subject, String message, String ip) {
    this.publicId = publicId;
    this.name = name;
    this.email = email;
    this.subject = subject;
    this.message = message;
    this.ip = ip;
    this.receivedAt = Instant.now();
  }

  public Long getDbId() {
    return dbId;
  }

  public String getPublicId() {
    return publicId;
  }

  public String getName() {
    return name;
  }

  public String getEmail() {
    return email;
  }

  public String getSubject() {
    return subject;
  }

  public String getMessage() {
    return message;
  }

  public String getIp() {
    return ip;
  }

  public Instant getReceivedAt() {
    return receivedAt;
  }
}
