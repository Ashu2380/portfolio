package dev.asharam.portfolio.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.Instant;

/** One editable site section (profile, projects, skills, experience, education).
 *  Payload is raw JSON, replaced wholesale by the admin API. */
@Entity
@Table(name = "site_content")
public class SiteContent {

  @Id
  @Column(length = 64)
  private String section;

  @Column(columnDefinition = "TEXT", nullable = false)
  private String payload;

  @Column(nullable = false)
  private Instant updatedAt;

  protected SiteContent() {}

  public SiteContent(String section, String payload) {
    this.section = section;
    this.payload = payload;
    this.updatedAt = Instant.now();
  }

  public String getSection() {
    return section;
  }

  public String getPayload() {
    return payload;
  }

  public void setPayload(String payload) {
    this.payload = payload;
    this.updatedAt = Instant.now();
  }

  public Instant getUpdatedAt() {
    return updatedAt;
  }
}
