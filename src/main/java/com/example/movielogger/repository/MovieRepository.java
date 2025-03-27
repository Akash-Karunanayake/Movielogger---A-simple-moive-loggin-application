package com.example.movielogger.repository;

import com.example.movielogger.entity.Movie;
import com.example.movielogger.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MovieRepository extends JpaRepository<Movie, Long> {
    // Retrieve all movies for a specific user
    List<Movie> findByUser(User user);
}
