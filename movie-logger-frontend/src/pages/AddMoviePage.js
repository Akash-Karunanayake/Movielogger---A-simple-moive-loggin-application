import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddMoviePage = () => {
  const [movieData, setMovieData] = useState({
    movieName: '',
    watchedDate: '',
    posterUrl: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setMovieData({
      ...movieData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddMovie = async () => {
    setError('');
    setSuccess('');
    try {
      const token = localStorage.getItem('token');
      // Call your backend endpoint to add a movie.
      // Assuming endpoint: POST http://localhost:8080/movies
      await axios.post('http://localhost:8080/movies', movieData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess('Movie added successfully!');
      // Redirect back to dashboard after a short delay
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err) {
      console.error(err);
      setError('Failed to add movie. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>Add New Movie</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        <TextField
          label="Movie Name"
          name="movieName"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          value={movieData.movieName}
          onChange={handleChange}
        />
        <TextField
          label="Watched Date"
          name="watchedDate"
          type="date"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          InputLabelProps={{ shrink: true }}
          value={movieData.watchedDate}
          onChange={handleChange}
        />
        <TextField
          label="Poster URL"
          name="posterUrl"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          value={movieData.posterUrl}
          onChange={handleChange}
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleAddMovie}>
          Add Movie
        </Button>
      </Box>
    </Container>
  );
};

export default AddMoviePage;
