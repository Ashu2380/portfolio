package dev.asharam.portfolio.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/** Incoming payload for POST /api/contact. */
public record ContactRequest(
    @NotBlank(message = "Name must be at least 2 characters")
        @Size(min = 2, max = 100, message = "Name must be at least 2 characters")
        String name,
    @NotBlank(message = "Please enter a valid email address")
        @Email(message = "Please enter a valid email address")
        @Size(max = 160)
        String email,
    @NotBlank(message = "Subject must be at least 3 characters")
        @Size(min = 3, max = 200, message = "Subject must be at least 3 characters")
        String subject,
    @NotBlank(message = "Message must be at least 10 characters")
        @Size(min = 10, max = 5000, message = "Message must be at least 10 characters")
        String message) {}
