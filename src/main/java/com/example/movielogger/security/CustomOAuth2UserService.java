package com.example.movielogger.security;

import com.example.movielogger.entity.User;
import com.example.movielogger.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder; // To generate a dummy password for new OAuth2 users

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        // Delegate to the default implementation for loading the user info
        OAuth2User oauth2User = super.loadUser(userRequest);

        // Extract user attributes from the OAuth2 provider
        Map<String, Object> attributes = oauth2User.getAttributes();

        // The exact attribute keys depend on the provider
        String email = (String) attributes.get("email");
        String name = (String) attributes.get("name");

        // Check if user already exists in our database; if not, create one.
        Optional<User> userOptional = userRepository.findByEmail(email);
        User user;
        if (userOptional.isPresent()) {
            user = userOptional.get();
        } else {
            user = new User();
            user.setEmail(email);
            // Generate a dummy password (not used since OAuth2 login is delegated)
            user.setPassword(passwordEncoder.encode("oauth2user"));
            user.setName(name);
            // You might set a default age or ask for additional info later.
            user.setAge(18);
            userRepository.save(user);
        }
        // Could also update user details here if needed.

        return oauth2User;
    }
}
