package com.example.FoodiesCustom.DatabaseEntities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashMap;
import java.util.Map;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Document(value = "Orders")
public class Order {
    @Id
    String orderId;
    String userId;
    String fullName;
    String email;
    String address;
    String state;
    String zip;
    Map<String,Integer> items = new HashMap<>();
    String orderStatus;
    String transactionId;
    String paymentStatus;
}
