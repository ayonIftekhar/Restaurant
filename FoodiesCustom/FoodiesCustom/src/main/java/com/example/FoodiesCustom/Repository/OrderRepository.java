package com.example.FoodiesCustom.Repository;

import com.example.FoodiesCustom.DatabaseEntities.Order;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface OrderRepository extends MongoRepository<Order,String> {
    List<Order> findByUserId(String userId);
    Order findByTransactionId(String transactionId);
    void deleteByTransactionId(String transactionId);
}
