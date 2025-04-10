package com.example.FoodiesCustom.OrderService;

import com.example.FoodiesCustom.DatabaseEntities.Order;
import com.example.FoodiesCustom.Repository.OrderRepository;
import com.example.FoodiesCustom.Repository.UserRepository;
import com.example.FoodiesCustom.UserService.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    OrderRepository orderRepository;

    @Override
    public void addOrder(OrderRequest orderRequest, String userId,String transactionId) {
        Order newOrder = generateOrderFromRequest(orderRequest,userId,transactionId);
        orderRepository.save(newOrder);
    }

    @Override
    public void updatePaymentStatus(String transactionId) {
        Order newOrder = orderRepository.findByTransactionId(transactionId);
        newOrder.setPaymentStatus("Paid");
        orderRepository.save(newOrder);
    }

    @Override
    public void deleteByTransactionId(String transactionId) {
        orderRepository.deleteByTransactionId(transactionId);
    }

    private OrderResponse generateResponseFromOrder(Order newOrder) {
        return OrderResponse.builder()
                .orderId(newOrder.getOrderId())
                .userID(newOrder.getUserId())
                .address(newOrder.getAddress() + ", " + newOrder.getState() + ", " + newOrder.getZip())
                .items(newOrder.getItems())
                .build();
    }

    private Order generateOrderFromRequest(OrderRequest orderRequest, String userId,String transactionId) {
        return Order.builder()
                .email(orderRequest.getEmail())
                .address(orderRequest.getAddress())
                .state(orderRequest.getState())
                .zip(orderRequest.getZip())
                .items(orderRequest.getItems())
                .fullName(orderRequest.getFirstName() + " " + orderRequest.getLastName())
                .userId(userId)
                .orderStatus("Preparing")
                .paymentStatus("Unpaid")
                .transactionId(transactionId)
                .build();
    }
}
