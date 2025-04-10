package com.example.FoodiesCustom.ContactService;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class RecaptchaService {

    @Value("${captcha.secret}")
    private String secret;

    public boolean isTokenValid(String token) {
        String url = "https://www.google.com/recaptcha/api/siteverify";

        RestTemplate restTemplate = new RestTemplate();
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("secret", secret);
        params.add("response", token);

        ResponseEntity<Map> response = restTemplate.postForEntity(url, params, Map.class);
        return (Boolean) response.getBody().get("success");
    }
}

