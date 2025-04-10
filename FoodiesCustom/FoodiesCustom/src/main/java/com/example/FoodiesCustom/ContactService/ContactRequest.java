package com.example.FoodiesCustom.ContactService;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class ContactRequest {
    @NotBlank
    private String name;

    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String message;

    @NotBlank
    private String recaptchaToken;

}
