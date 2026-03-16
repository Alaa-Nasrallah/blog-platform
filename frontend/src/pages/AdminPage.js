import React from 'react';
import { useAuth } from '../context/AuthContext';

const AdminPage = () => {
  const { user } = useAuth();
  
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="admin-stats">
        <div className="stat-card">
          <h3>Welcome</h3>
          <p>{user?.username}</p>
        </div>
      </div>
      <p>Admin features coming soon!</p>
    </div>
  );
};

export default AdminPage;
