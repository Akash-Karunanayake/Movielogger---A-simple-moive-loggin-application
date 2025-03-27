package com.example.movielogger.service;

import com.example.movielogger.entity.User;
import com.example.movielogger.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;

    // PasswordEncoder bean must be defined in your security configuration or a separate config class.
    @Autowired
    private PasswordEncoder passwordEncoder;

    // Register a new user (traditional registration)
    public User registerUser(User user) {
        // Encrypt the password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    // Find user by email (used during login)
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // Update user profile (only name and profile picture URL are updatable)
    public User updateUserProfile(Long userId, String newName, String newProfilePictureUrl) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setName(newName);
        user.setProfilePictureUrl(newProfilePictureUrl);
        return userRepository.save(user);
    }
}
