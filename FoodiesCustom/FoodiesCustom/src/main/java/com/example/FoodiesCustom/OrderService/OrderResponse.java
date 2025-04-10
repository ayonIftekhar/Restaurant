package com.example.FoodiesCustom.OrderService;

import lombok.Builder;
import lombok.Data;

import java.util.HashMap;
import java.util.Map;

@Data
@Builder
public class OrderResponse {
    String orderId;
    String userID;
    String address;
    Map<String,Integer> items = new HashMap<>();
}
