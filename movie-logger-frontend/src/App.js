import React from 'react';
import {Routes, Route} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import Navbar from './components/Navbar';
import AddMoviePage from './pages/AddMoviePage';
import ProtectedRoute from './components/ProtectedRoute'


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* Protected routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />
        <Route path="/add-movie" element={
        <ProtectedRoute>
          <AddMoviePage />
        </ProtectedRoute>
        } />
        
        {/* You can add more protected routes for movie management here */}
      </Routes>
    </>
  );
}
export default App;
