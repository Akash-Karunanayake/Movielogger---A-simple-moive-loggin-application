// src/pages/RegisterPage.js
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    age: '',
    profilePictureUrl: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    setError('');
    try {
      await axios.post('http://localhost:8080/auth/register', formData);
      navigate('/login');
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>Register</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <TextField
          label="Email"
          name="email"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          value={formData.password}
          onChange={handleChange}
        />
        <TextField
          label="Name"
          name="name"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          label="Age"
          name="age"
          type="number"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          value={formData.age}
          onChange={handleChange}
        />
        <TextField
          label="Profile Picture URL"
          name="profilePictureUrl"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          value={formData.profilePictureUrl}
          onChange={handleChange}
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleRegister}>
          Register
        </Button>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Already have an account? <Link to="/login">Login</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default RegisterPage;
// The RegisterPage component is similar to the LoginPage component, but it has a form with more fields. The user can input their email, password, name, age, and profile picture URL. 
// The handleRegister function sends a POST request to the /auth/register endpoint with the form data. If the registration is successful, the user is redirected to the login page.