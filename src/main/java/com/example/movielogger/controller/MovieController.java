package com.example.movielogger.controller;

import com.example.movielogger.entity.Movie;
import com.example.movielogger.entity.User;
import com.example.movielogger.service.MovieService;
import com.example.movielogger.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/movies")
public class MovieController {
    
    @Autowired
    private MovieService movieService;

    @Autowired
    private UserService userService;

    // Endpoint to add a new movie
    @PostMapping
    public ResponseEntity<?> addMovie(@AuthenticationPrincipal UserDetails userDetails,
                                      @Valid @RequestBody Movie movie) {
        User currentUser = userService.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Movie createdMovie = movieService.addMovie(movie, currentUser);
        return ResponseEntity.ok(createdMovie);
    }

    // Retrieve all movies for the authenticated user
    @GetMapping
    public ResponseEntity<List<Movie>> getMovies(@AuthenticationPrincipal UserDetails userDetails) {
        User currentUser = userService.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        List<Movie> movies = movieService.getMoviesForUser(currentUser);
        return ResponseEntity.ok(movies);
    }

    // Update a movie
    @PutMapping("/{id}")
    public ResponseEntity<?> updateMovie(@AuthenticationPrincipal UserDetails userDetails,
                                         @PathVariable("id") Long movieId,
                                         @Valid @RequestBody Movie movie) {
        User currentUser = userService.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Movie updatedMovie = movieService.updateMovie(movie, movieId, currentUser);
        return ResponseEntity.ok(updatedMovie);
    }

    // Delete a movie
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMovie(@AuthenticationPrincipal UserDetails userDetails,
                                         @PathVariable("id") Long movieId) {
        User currentUser = userService.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        movieService.deleteMovie(movieId, currentUser);
        return ResponseEntity.ok("Movie deleted successfully");
    }
}
