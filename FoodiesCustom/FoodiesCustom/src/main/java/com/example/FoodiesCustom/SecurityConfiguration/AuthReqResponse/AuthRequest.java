package com.example.FoodiesCustom.SecurityConfiguration.AuthReqResponse;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AuthRequest {
    String email;
    String password;
}
