package com.example.movielogger.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Email;
import java.util.Set;

@Entity
@Table(name = "users", schema = "movielogger")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Email used for registration/login
    @NotBlank(message = "Email is mandatory")
    @Email(message = "Email should be valid")
    @Column(unique = true, nullable = false)
    private String email;

    // Password for traditional authentication (if using OAuth, this might be null)
    @NotBlank(message = "Password is mandatory")
    @Column(nullable = false)
    private String password;

    // The user's display name (can be updated later)
    @NotBlank(message = "Name is mandatory")
    @Column(nullable = false)
    private String name;

    // Age with a minimum value validation (for example, minimum age of 13)
    @NotNull(message = "Age is required")
    @Min(value = 13, message = "Age should be at least 13")
    @Column(nullable = false)
    private Integer age;

    // URL to the user's profile picture stored in Supabase Storage
    private String profilePictureUrl;

    // One-to-many relationship: a user can have multiple movies logged
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Movie> movies;

    // Getters and setters (or use Lombok for brevity)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getProfilePictureUrl() {
        return profilePictureUrl;
    }

    public void setProfilePictureUrl(String profilePictureUrl) {
        this.profilePictureUrl = profilePictureUrl;
    }

    public Set<Movie> getMovies() {
        return movies;
    }

    public void setMovies(Set<Movie> movies) {
        this.movies = movies;
    }
}
