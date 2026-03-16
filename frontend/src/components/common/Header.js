import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <Link to="/">BlogPlatform</Link>
        </div>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          
          {isAuthenticated ? (
            <>
              {isAdmin && <Link to="/create-post">Create Post</Link>}
              {isAdmin && <Link to="/admin">Admin</Link>}
              <span>Welcome, {user?.username}</span>
              <button onClick={handleLogout} className="btn-logout">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;