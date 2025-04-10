package com.example.FoodiesCustom.UserService;

import com.example.FoodiesCustom.DatabaseEntities.User;
import com.example.FoodiesCustom.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
public class UserServiceImpl implements userService{

    @Autowired
    private UserRepository userRepository ;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserResponse register(UserRequest request) {
        User newUser = generateUserFromRequest(request);
        newUser = userRepository.save(newUser);
        return this.generateResponseFromEntity(newUser);
    }

    @Override
    public void clearCart(String userId) {
        User newUser = userRepository.findById(userId).get();
        newUser.setCart(new HashMap<>());
        userRepository.save(newUser);
    }

    private User generateUserFromRequest(UserRequest request){
        return User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .roles("ROLE_USER")
                .phone(request.getPhone())
                .build();
    }

    private UserResponse generateResponseFromEntity(User newUser){
        return UserResponse.builder()
                .id(newUser.getId())
                .email(newUser.getEmail())
                .name(newUser.getName())
                .build();
    }
}
