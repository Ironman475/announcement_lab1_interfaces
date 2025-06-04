import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navigation from './components/common/Navigation';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import AboutPage from './components/pages/AboutPage';
import ProfilePage from './components/pages/ProfilePage';
import AnnouncementsPage from './components/pages/AnnouncementsPage';
import ProtectedRoute from './components/common/ProtectedRoute';

const App = () => (
  <div>
    <Navigation />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      <Route path="/announcements" element={<ProtectedRoute><AnnouncementsPage /></ProtectedRoute>} />
    </Routes>
  </div>
);

export default App;
