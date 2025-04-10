package com.example.FoodiesCustom.Cotroller;

import com.example.FoodiesCustom.DatabaseEntities.Order;
import com.example.FoodiesCustom.DatabaseEntities.User;
import com.example.FoodiesCustom.OrderService.*;
import com.example.FoodiesCustom.Repository.OrderRepository;
import com.example.FoodiesCustom.Repository.UserRepository;
import com.example.FoodiesCustom.SecurityConfiguration.JwtUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.http.HttpResponse;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private JwtUtility jwtUtility;
    @Autowired
    private UserRepository userRepository;


    @GetMapping("/orders")
    public ResponseEntity<?> createOrder(@RequestHeader("Authorization") String authHeader){

        String token = authHeader.replace("Bearer ", "");
        String userName = jwtUtility.extractUserName(token);
        String  userId = userRepository.findByEmail(userName).get().getId();

        List<Order> orders = orderRepository.findByUserId(userId);

        return ResponseEntity.ok(orders);
    }

    @GetMapping("/all-orders")
    public ResponseEntity<?> getAllOrders(){
        List<Order> orders = orderRepository.findAll();
        return  ResponseEntity.ok(orders);
    }


    @PutMapping("/all-orders/{orderId}")
    public ResponseEntity<String> updateOrderStatus(
            @PathVariable String orderId,
            @RequestBody Map<String, String> payload
    ) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        if (optionalOrder.isPresent()) {
            Order order = optionalOrder.get();
            order.setOrderStatus(payload.get("status"));
            orderRepository.save(order);
            return ResponseEntity.ok("Order status updated");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Order not found");
        }
    }
}
