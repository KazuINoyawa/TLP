import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from '../pages/Home';
import DestinationList from '../pages/DestinationList';
import DestinationDetail from '../pages/DestinationDetail';
import Login from '../pages/Login';
import Register from '../pages/Register';
import TravelPackages from '../pages/TravelPackages';
import TravelPackageDetail from '../pages/TravelPackageDetail';
import MyBookings from '../pages/MyBookings';

const AppRouter = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/destinations" element={<DestinationList />} />
        <Route path="/destination/:id" element={<DestinationDetail />} />
        <Route path="/packages" element={<TravelPackages />} />
        <Route path="/travel-packages/:id" element={<TravelPackageDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/my-bookings" element={<MyBookings />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AppRouter;
