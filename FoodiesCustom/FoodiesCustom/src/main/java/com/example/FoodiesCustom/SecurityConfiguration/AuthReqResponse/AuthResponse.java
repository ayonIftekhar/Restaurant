package com.example.FoodiesCustom.SecurityConfiguration.AuthReqResponse;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import software.amazon.awssdk.services.s3.endpoints.internal.Value;

import java.util.HashMap;
import java.util.Map;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AuthResponse {
    String token;
    Map<String,Integer> cart = new HashMap<>();
}
