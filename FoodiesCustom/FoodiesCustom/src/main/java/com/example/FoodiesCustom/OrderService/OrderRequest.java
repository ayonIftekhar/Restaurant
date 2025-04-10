package com.example.FoodiesCustom.OrderService;

import lombok.Builder;
import lombok.Data;

import java.util.HashMap;
import java.util.Map;

@Builder
@Data
public class OrderRequest {
    String firstName;
    String LastName;
    String email;
    String address;
    String country;
    String state;
    String zip;
    Map<String,Integer> items = new HashMap<>();
    double price;
}
