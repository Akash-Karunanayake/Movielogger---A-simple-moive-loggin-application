package com.example.movielogger.service;

import com.example.movielogger.entity.Movie;
import com.example.movielogger.entity.User;
import com.example.movielogger.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieService {
    @Autowired
    private MovieRepository movieRepository;

    // Add a new movie for a given user
    public Movie addMovie(Movie movie, User user) {
        movie.setUser(user);
        return movieRepository.save(movie);
    }

    // Retrieve all movies logged by a specific user
    public List<Movie> getMoviesForUser(User user) {
        return movieRepository.findByUser(user);
    }

    // Update an existing movie's details
    public Movie updateMovie(Movie updatedMovie, Long movieId, User user) {
        Movie existingMovie = movieRepository.findById(movieId)
                .orElseThrow(() -> new RuntimeException("Movie not found"));
        // Ensure that the movie belongs to the user
        if (!existingMovie.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized to update this movie");
        }
        existingMovie.setMovieName(updatedMovie.getMovieName());
        existingMovie.setWatchedDate(updatedMovie.getWatchedDate());
        existingMovie.setPosterUrl(updatedMovie.getPosterUrl());
        return movieRepository.save(existingMovie);
    }

    // Delete a movie entry
    public void deleteMovie(Long movieId, User user) {
        Movie existingMovie = movieRepository.findById(movieId)
                .orElseThrow(() -> new RuntimeException("Movie not found"));
        if (!existingMovie.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized to delete this movie");
        }
        movieRepository.delete(existingMovie);
    }
}
