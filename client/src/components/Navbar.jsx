import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar">
    <Link to="/">Home</Link>
    <Link to="/destinations">Địa điểm</Link>
    <Link to="/login">Đăng nhập</Link>
    <Link to="/register">Đăng ký</Link>
  </nav>
);

export default Navbar;
