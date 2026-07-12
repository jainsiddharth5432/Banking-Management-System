package com.bank.bankingmanagementsystem.controller;

import com.bank.bankingmanagementsystem.dto.LoginRequest;
import com.bank.bankingmanagementsystem.dto.LoginResponse;
import com.bank.bankingmanagementsystem.dto.RegisterRequest;
import com.bank.bankingmanagementsystem.entity.User;
import com.bank.bankingmanagementsystem.security.JwtUtil;
import com.bank.bankingmanagementsystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public User register(@RequestBody RegisterRequest request) {

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());

        return userService.register(user);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {

        System.out.println("Email Received = " + request.getEmail());
        System.out.println("Password Received = " + request.getPassword());

        User user = userService.login(
                request.getEmail(),
                request.getPassword()
        );

        System.out.println("User Found = " + user.getEmail());

        String token = jwtUtil.generateToken(user.getEmail());

        System.out.println("Token Generated");

        return new LoginResponse(
                token,
                user.getRole(),
                "Login Successful!"
        );
    }
    @PostMapping("/create-admin")
    public User createAdmin(@RequestBody RegisterRequest request) {

        User user = new User();

        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setRole("ADMIN");

        return userService.createAdmin(user);
    }

}