package com.example.movielogger.controller;

import com.example.movielogger.entity.User;
import com.example.movielogger.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    // Endpoint to update user profile (only name and profile picture)
    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@AuthenticationPrincipal UserDetails userDetails,
                                           @Valid @RequestBody User updateRequest) {
        // Here, we assume the UserDetails username is the user's email.
        User currentUser = userService.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        // Only update name and profile picture URL
        User updatedUser = userService.updateUserProfile(currentUser.getId(), updateRequest.getName(), updateRequest.getProfilePictureUrl());
        return ResponseEntity.ok(updatedUser);
    }
}
