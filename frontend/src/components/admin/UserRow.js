import React from 'react';

const UserRow = ({ user, currentUser, onPromote, onDelete }) => {
  const isCurrentUser = currentUser?._id === user._id;
  const isAdmin = user.role === 'admin';
  
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className={`user-row ${isCurrentUser ? 'current-user' : ''}`}>
      <div className="col-username">
        <span className="username">{user.username}</span>
        {isCurrentUser && <span className="current-user-badge">(You)</span>}
      </div>
      
      <div className="col-email">
        <a href={`mailto:${user.email}`} className="user-email">
          {user.email}
        </a>
      </div>
      
      <div className="col-role">
        <span className={`role-badge role-${user.role}`}>
          {user.role}
        </span>
      </div>
      
      <div className="col-joined">
        {formatDate(user.createdAt)}
      </div>
      
      <div className="col-actions">
        {!isAdmin && !isCurrentUser && (
          <button
            onClick={() => onPromote(user._id)}
            className="btn-promote"
            title="Promote to Admin"
          >
            Promote
          </button>
        )}
        
        {!isCurrentUser && (
          <button
            onClick={() => onDelete(user._id)}
            className="btn-delete-user"
            title="Delete User"
          >
            Delete
          </button>
        )}
        
        {isAdmin && !isCurrentUser && (
          <span className="admin-badge">Admin</span>
        )}
        
        {isCurrentUser && (
          <span className="current-user-text">Current User</span>
        )}
      </div>
    </div>
  );
};

export default UserRow;