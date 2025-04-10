package com.example.FoodiesCustom.SecurityConfiguration;

import com.example.FoodiesCustom.OAuth2Handler.GoogleOAuth2SuccessHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.authentication.configurers.userdetails.DaoAuthenticationConfigurer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;


@Configuration
public class SecurityConfiguration {

    @Autowired
    public CustomUserDetailsService userDetailsService;

    @Autowired
    public JwtAuthFilter jwtAuthFilter;

    @Autowired
    public GoogleOAuth2SuccessHandler googleOAuth2SuccessHandler;

    @Bean
    public PasswordEncoder getPasswordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOriginPatterns(List.of("http://localhost:5173", "http://localhost:5174","https://sandbox.sslcommerz.com","null"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("Authorization", "Content-Type"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }


    @Bean
    public AuthenticationProvider getAuthenticationProvider(){
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(getPasswordEncoder());
        provider.setUserDetailsService(userDetailsService);
        return provider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain getSecurityFilterChain(HttpSecurity security) throws Exception{
        return security
                .cors( cors -> cors.configurationSource(corsConfigurationSource())  )
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(sm->sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(getAuthenticationProvider())
                .addFilterBefore(jwtAuthFilter , UsernamePasswordAuthenticationFilter.class)
                .authorizeHttpRequests(auth ->
                        auth.requestMatchers("/api/login","/api/register").permitAll()
                                .requestMatchers( "/api/foods/**").permitAll()
                                .requestMatchers( "/api/all-orders/**").permitAll()
                                .requestMatchers("/api/payment/success/**", "/api/payment/fail/**","/api/payment/cancel/**").permitAll()
                                .anyRequest().authenticated()
                        )
                .oauth2Login(oauth2->oauth2.successHandler(googleOAuth2SuccessHandler))
                .build();
    }
}
