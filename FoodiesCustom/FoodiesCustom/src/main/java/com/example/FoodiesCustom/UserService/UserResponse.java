package com.example.FoodiesCustom.UserService;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class UserResponse {
    private String id ;
    private String name ;
    private String email ;
}
