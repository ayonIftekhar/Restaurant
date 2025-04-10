package com.example.FoodiesCustom.OrderService;


public interface OrderService {
    void addOrder(OrderRequest orderRequest , String userName , String transactionId);
    void updatePaymentStatus(String transactionId);
    void deleteByTransactionId(String transactionId);
}
