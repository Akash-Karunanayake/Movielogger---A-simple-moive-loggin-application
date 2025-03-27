// src/pages/ProfilePage.js
import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';
import axios from 'axios';

const ProfilePage = () => {
  const [profile, setProfile] = useState({ name: '', profilePictureUrl: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    // Optionally fetch user profile from backend here
    // For now, you can simulate it or integrate with an endpoint if available.
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    setError('');
    setSuccess('');
    try {
      const response = await axios.put('http://localhost:8080/users/profile', profile, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess('Profile updated successfully');
    } catch (err) {
      setError('Profile update failed.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>Profile</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        <TextField
          label="Name"
          name="name"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          value={profile.name}
          onChange={handleChange}
        />
        <TextField
          label="Profile Picture URL"
          name="profilePictureUrl"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          value={profile.profilePictureUrl}
          onChange={handleChange}
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleUpdate}>
          Update Profile
        </Button>
      </Box>
    </Container>
  );
};

export default ProfilePage;
// In this snippet, we have a functional component named ProfilePage.
// This component allows the user to update their profile information, such as name and profile picture URL.