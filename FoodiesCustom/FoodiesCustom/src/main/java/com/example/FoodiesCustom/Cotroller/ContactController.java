package com.example.FoodiesCustom.Cotroller;

import com.example.FoodiesCustom.ContactService.ContactRequest;
import com.example.FoodiesCustom.ContactService.RecaptchaService;
import com.example.FoodiesCustom.Email.EmailService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/contact")
public class ContactController {
    private final EmailService emailService;
    private final RecaptchaService recaptchaService;

    public ContactController(EmailService emailService, RecaptchaService recaptchaService) {
        this.emailService = emailService;
        this.recaptchaService = recaptchaService;
    }

    @PostMapping
    public ResponseEntity<String> handleContact(@Valid @RequestBody ContactRequest request) {
        if (!recaptchaService.isTokenValid(request.getRecaptchaToken())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("reCAPTCHA failed");
        }

        emailService.sendContactEmail(request.getName(), request.getEmail(), request.getMessage());
        return ResponseEntity.ok("Message sent");
    }
}
