import React, { useState, useEffect } from 'react';
import UserRow from './UserRow';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'admin', 'user'
  const [searchTerm, setSearchTerm] = useState('');
  const { user: currentUser } = useAuth();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/users');
      setUsers(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handlePromote = async (userId) => {
    try {
      await api.put(`/users/${userId}/promote`);
      // Update local state
      setUsers(users.map(user => 
        user._id === userId ? { ...user, role: 'admin' } : user
      ));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to promote user');
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    
    try {
      await api.delete(`/users/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete user');
    }
  };

  // Filter users based on role filter and search term
  const filteredUsers = users.filter(user => {
    // Role filter
    if (filter !== 'all' && user.role !== filter) return false;
    
    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        user.username?.toLowerCase().includes(term) ||
        user.email?.toLowerCase().includes(term)
      );
    }
    
    return true;
  });

  if (loading) return <div className="loading">Loading users...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="user-list-container">
      <div className="user-list-header">
        <h2>User Management</h2>
        <div className="user-list-controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="filter-buttons">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All ({users.length})
            </button>
            <button 
              className={`filter-btn ${filter === 'admin' ? 'active' : ''}`}
              onClick={() => setFilter('admin')}
            >
              Admins ({users.filter(u => u.role === 'admin').length})
            </button>
            <button 
              className={`filter-btn ${filter === 'user' ? 'active' : ''}`}
              onClick={() => setFilter('user')}
            >
              Users ({users.filter(u => u.role === 'user').length})
            </button>
          </div>
        </div>
      </div>

      <div className="users-table">
        <div className="users-table-header">
          <div className="col-username">Username</div>
          <div className="col-email">Email</div>
          <div className="col-role">Role</div>
          <div className="col-joined">Joined</div>
          <div className="col-actions">Actions</div>
        </div>

        {filteredUsers.length === 0 ? (
          <div className="no-users">No users found</div>
        ) : (
          filteredUsers.map(user => (
            <UserRow
              key={user._id}
              user={user}
              currentUser={currentUser}
              onPromote={handlePromote}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>

      <div className="user-list-footer">
        <p>Total: {users.length} users</p>
        <p>Showing: {filteredUsers.length} users</p>
      </div>
    </div>
  );
};

export default UserList;