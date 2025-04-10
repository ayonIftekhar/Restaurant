package com.example.FoodiesCustom.Cotroller;

import com.example.FoodiesCustom.DatabaseEntities.User;
import com.example.FoodiesCustom.Repository.UserRepository;
import com.example.FoodiesCustom.SecurityConfiguration.AuthReqResponse.AuthRequest;
import com.example.FoodiesCustom.SecurityConfiguration.AuthReqResponse.AuthResponse;
import com.example.FoodiesCustom.SecurityConfiguration.JwtUtility;
import com.example.FoodiesCustom.UserService.UserRequest;
import com.example.FoodiesCustom.UserService.UserResponse;
import com.example.FoodiesCustom.UserService.UserServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@AllArgsConstructor
@RestController
@RequestMapping("/api")
public class UserController {
    private UserServiceImpl userService ;

    private AuthenticationManager authenticationManager;

    private JwtUtility jwtUtility;

    private UserRepository userRepository;

    @ResponseStatus(HttpStatus.ACCEPTED)
    @PostMapping("/register")
    public UserResponse register(@RequestBody UserRequest userRequest){
        return userService.register(userRequest);
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest){
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authRequest.getEmail(),
                            authRequest.getPassword()
                    )
            );

            User user = (User) authentication.getPrincipal();
            String token = jwtUtility.generateToken((UserDetails)user);

            return ResponseEntity.ok(new AuthResponse(token,user.getCart()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }

    @PutMapping("/cart")
    public ResponseEntity<?> updateCart(@RequestHeader("Authorization") String authHeader,
                                        @RequestBody HashMap<String, Integer> updatedCart) {
        String token = authHeader.replace("Bearer ", "");
        String email = jwtUtility.extractUserName(token);

        if(userRepository.findByEmail(email).isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        User user = userRepository.findByEmail(email).get();

        user.setCart(updatedCart);
        userRepository.save(user); // Make sure `save` persists to DB

        return ResponseEntity.ok(user.getCart());
    }

    @GetMapping("/cart")
    public ResponseEntity<?> getCart(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        String email = jwtUtility.extractUserName(token);
//        System.out.println(token);
        if (userRepository.findByEmail(email).isEmpty()) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");

        User user = userRepository.findByEmail(email).get();

        return ResponseEntity.ok(user.getCart());
    }
}
