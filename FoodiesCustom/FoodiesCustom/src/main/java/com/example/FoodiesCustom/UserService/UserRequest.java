package com.example.FoodiesCustom.UserService;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserRequest {
    private String name ;
    private String email ;
    private String password ;
    private int phone;
}
