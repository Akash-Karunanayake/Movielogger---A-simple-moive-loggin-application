// src/pages/DashboardPage.js
import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText, Button, Stack } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/movies', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setMovies(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMovies();
  }, []);

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h4">Dashboard</Typography>
          <Button variant="contained" onClick={() => navigate('/add-movie')}>
            Add Movie
          </Button>
        </Stack>
        <Typography variant="h6">Your Movies</Typography>
        <List>
          {movies.map((movie) => (
            <ListItem key={movie.id}>
              <ListItemText primary={movie.movieName} secondary={`Watched on: ${movie.watchedDate}`} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default DashboardPage;
// In this snippet, we have a functional component named DashboardPage. 
// This component fetches a list of movies from the server and displays them in a list. 
// The useEffect hook is used to fetch the movies when the component is mounted. The movies are stored in the state variable movies using the useState hook.