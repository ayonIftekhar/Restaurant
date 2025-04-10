package com.example.FoodiesCustom.UserService;


import com.example.FoodiesCustom.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

public interface userService {
    UserResponse register(UserRequest request) ;
    void clearCart(String userId);
}
