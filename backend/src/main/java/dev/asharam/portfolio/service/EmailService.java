package dev.asharam.portfolio.service;

import dev.asharam.portfolio.dto.ContactRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

/**
 * Sends an email notification to the portfolio owner on every contact-form
 * submission. Needs Gmail SMTP configured (see application.properties).
 * If no password is set (MAIL_PASSWORD missing), sending is skipped and the
 * message is still saved in the database — so nothing ever breaks.
 */
@Service
public class EmailService {

  private static final Logger log = LoggerFactory.getLogger(EmailService.class);

  private final JavaMailSender mailSender;
  private final String from;
  private final String to;
  private final boolean configured;

  public EmailService(
      JavaMailSender mailSender,
      @Value("${portfolio.mail.from:}") String from,
      @Value("${portfolio.mail.to:}") String to,
      @Value("${spring.mail.password:}") String password) {
    this.mailSender = mailSender;
    this.from = from;
    this.to = to;
    this.configured = !from.isBlank() && !to.isBlank() && !password.isBlank();
  }

  @Async
  public void notifyOwner(ContactRequest req) {
    if (!configured) {
      log.info("Mail not configured (MAIL_PASSWORD missing) — skipping email, message is in DB.");
      return;
    }
    try {
      SimpleMailMessage mail = new SimpleMailMessage();
      mail.setFrom(from);
      mail.setTo(to);
      mail.setSubject("[Portfolio] " + req.subject().trim());
      mail.setText(
          "New message from your portfolio contact form\n\n"
              + "Name: " + req.name().trim() + "\n"
              + "Email: " + req.email().trim() + "\n"
              + "Subject: " + req.subject().trim() + "\n\n"
              + req.message().trim());
      mailSender.send(mail);
      log.info("Notification email sent to {}", to);
    } catch (Exception ex) {
      // Never fail the API because email failed — message is already saved.
      log.warn("Could not send notification email: {}", ex.getMessage());
    }
  }
}
