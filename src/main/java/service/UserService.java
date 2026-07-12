package com.bank.bankingmanagementsystem.service;

import com.bank.bankingmanagementsystem.entity.User;
import com.bank.bankingmanagementsystem.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.bank.bankingmanagementsystem.entity.Account;
import com.bank.bankingmanagementsystem.repository.AccountRepository;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final AccountRepository accountRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UserService(UserRepository userRepository,
                       AccountRepository accountRepository) {

        this.userRepository = userRepository;
        this.accountRepository = accountRepository;
    }

    public User register(User user) {

        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already exists!");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        user.setRole("USER");

// Save User
        User savedUser = userRepository.save(user);

// Create Account Automatically
        Account account = new Account();

        account.setAccountHolderName(savedUser.getUsername());

// Simple account number generation
        account.setAccountNumber("ACC" + System.currentTimeMillis());

        account.setBalance(0.0);

// Link User with Account
        account.setUser(savedUser);

// Save Account
        accountRepository.save(account);

        return savedUser;
    }

    public User login(String email, String password) {

        System.out.println("Searching Email = " + email);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        System.out.println("Entered Password = " + password);
        System.out.println("Database Password = " + user.getPassword());

        boolean match = passwordEncoder.matches(password, user.getPassword());

        System.out.println("Password Match = " + match);

        if (!match) {
            throw new RuntimeException("Invalid Password");
        }

        return user;
    }
    public User createAdmin(User user) {

        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("ADMIN");

        return userRepository.save(user);
    }
}