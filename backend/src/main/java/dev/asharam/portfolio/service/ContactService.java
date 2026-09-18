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
  private final EmailService emailService;

  public ContactService(ContactMessageRepository repository, EmailService emailService) {
    this.repository = repository;
    this.emailService = emailService;
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
    emailService.notifyOwner(req);
    return ContactResponse.success(saved.getPublicId(), repository.count());
  }
}
