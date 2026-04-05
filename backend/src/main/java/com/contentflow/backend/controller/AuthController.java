package com.contentflow.backend.controller;

import com.contentflow.backend.model.User;
import com.contentflow.backend.repository.UserRepository;
import com.contentflow.backend.security.JwtUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/auth")
public class AuthController {
    
    private final UserRepository userRepository;
    private final JwtUtils jwtUtils;

    public AuthController(UserRepository userRepository, JwtUtils jwtUtils) {
        this.userRepository = userRepository;
        this.jwtUtils = jwtUtils;
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody Map<String, String> loginRequest) {
        String identifier = loginRequest.get("username") != null ? loginRequest.get("username") : loginRequest.get("email");
        String password = loginRequest.get("password");

        User user = userRepository.findByUsername(identifier);
        if (user == null) {
            user = userRepository.findByEmail(identifier);
        }
        
        if (user == null || !user.getPassword().equals(password)) {
            return ResponseEntity.badRequest().body("Error: Invalid credentials");
        }

        String jwt = jwtUtils.generateJwtToken(user.getUsername());
        
        Map<String, String> response = new HashMap<>();
        response.put("token", jwt);
        response.put("username", user.getUsername());
        response.put("email", user.getEmail());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Map<String, String> signUpRequest) {
        if (userRepository.findByUsername(signUpRequest.get("username")) != null) {
            return ResponseEntity.badRequest().body("Error: Username is already taken!");
        }

        if (userRepository.findByEmail(signUpRequest.get("email")) != null) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }

        // Create new user's account
        User user = new User(signUpRequest.get("username"), 
                             signUpRequest.get("email"),
                             signUpRequest.get("password"));

        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully!");
    }
}
