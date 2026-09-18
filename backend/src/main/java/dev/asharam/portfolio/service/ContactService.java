package dev.asharam.portfolio.service;

import dev.asharam.portfolio.dto.ContactRequest;
import dev.asharam.portfolio.dto.ContactResponse;
import dev.asharam.portfolio.model.ContactMessage;
import dev.asharam.portfolio.repository.ContactMessageRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ContactService {

  private final ContactMessageRepository repository;

  public ContactService(ContactMessageRepository repository) {
    this.repository = repository;
  }

  @Transactional
  public ContactResponse submit(ContactRequest req, String ip) {
    ContactMessage saved =
        repository.save(
            new ContactMessage(
                ContactResponse.newId(),
                req.name().trim(),
                req.email().trim(),
                req.subject().trim(),
                req.message().trim(),
                ip));
    return ContactResponse.success(saved.getPublicId(), repository.count());
  }
}
