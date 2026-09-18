package dev.asharam.portfolio.service;

import dev.asharam.portfolio.model.SiteContent;
import dev.asharam.portfolio.repository.SiteContentRepository;
import java.util.HashMap;
import java.util.Map;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/** Reads/writes whole site sections as JSON. Empty sections simply mean
 *  "not customized yet" — the frontend then uses its bundled defaults. */
@Service
public class ContentService {

  /** Sections the admin UI is allowed to read/write. */
  public static final java.util.Set<String> ALLOWED =
      java.util.Set.of("profile", "projects", "skills", "experience", "education");

  private final SiteContentRepository repository;

  public ContentService(SiteContentRepository repository) {
    this.repository = repository;
  }

  public Map<String, Object> all() {
    Map<String, Object> out = new HashMap<>();
    repository.findAll().forEach(c -> out.put(c.getSection(), c.getPayload()));
    return out;
  }

  @Transactional
  public void save(String section, String payload) {
    if (!ALLOWED.contains(section)) {
      throw new IllegalArgumentException("Unknown section: " + section);
    }
    if (payload == null || payload.isBlank() || payload.length() > 200_000) {
      throw new IllegalArgumentException("Payload empty or too large");
    }
    repository
        .findById(section)
        .ifPresentOrElse(
            c -> c.setPayload(payload), () -> repository.save(new SiteContent(section, payload)));
  }
}
