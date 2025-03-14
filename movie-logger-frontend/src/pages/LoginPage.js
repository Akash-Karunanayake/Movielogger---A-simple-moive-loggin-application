// src/pages/LoginPage.js
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Alert, Stack } from '@mui/material';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError('');
    try {
      const response = await axios.post('http://localhost:8080/auth/login', {
        email,
        password
      });
      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (err) {
      setError('Invalid credentials or server error.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>Login</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
          Login
        </Button>

    <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
        <Button
            variant="contained"
            color="error"
            onClick={() => window.location.href = 'http://localhost:8080/oauth2/authorization/google'}
        >
            Login with Google
        </Button>
        <Button
             variant="contained"
             color="primary"
             onClick={() => window.location.href = 'http://localhost:8080/oauth2/authorization/facebook'}
        >
            Login with Facebook
        </Button>
    </Stack>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Don't have an account? <Link to="/register">Register</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default LoginPage;
// In this snippet, we have a functional component named LoginPage.
// This component renders a login form with email and password fields.
