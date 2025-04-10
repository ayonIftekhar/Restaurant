package com.example.FoodiesCustom.OAuth2Handler;

import com.example.FoodiesCustom.DatabaseEntities.User;
import com.example.FoodiesCustom.Repository.UserRepository;
import com.example.FoodiesCustom.SecurityConfiguration.JwtUtility;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.HashMap;

@Component
public class GoogleOAuth2SuccessHandler implements AuthenticationSuccessHandler {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtility jwtUtility;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {

        OAuth2User oauthUser = (OAuth2User) authentication.getPrincipal();
        String email = oauthUser.getAttribute("email");

        // Check if user exists
        if (userRepository.findByEmail(email).isEmpty()) {
            User newUser = new User();
            newUser.setEmail(email);
            newUser.setName(oauthUser.getAttribute("name"));
            newUser.setRoles("ROLE_USER");
            newUser.setCart(new HashMap<>());
            userRepository.save(newUser);
        }

        // Redirect to frontend
        String jwt = jwtUtility.generateToken(userRepository.findByEmail(email).get());
        response.sendRedirect("http://localhost:5173/oauth-success/" + jwt);
    }
}
