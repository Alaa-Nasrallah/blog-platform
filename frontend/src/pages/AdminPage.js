import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import UserList from '../components/admin/UserList';
import api from '../services/api';

const AdminPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    users: 0,
    posts: 0,
    comments: 0
  });
  const [loading, setLoading] = useState(true);
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch all statistics in parallel
      const [usersRes, postsRes, commentsRes] = await Promise.all([
        api.get('/users'),
        api.get('/posts'),
        api.get('/comments/admin/all') // This endpoint gets all comments including deleted
      ]);
      
      setStats({
        users: usersRes.data.length,
        posts: postsRes.data.length,
        comments: commentsRes.data.length
      });

      // Get 5 most recent posts
      setRecentPosts(postsRes.data.slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm('Delete this post?')) {
      try {
        await api.delete(`/posts/${postId}`);
        // Refresh data after deletion
        fetchDashboardData();
      } catch (error) {
        alert('Failed to delete post');
      }
    }
  };

  if (loading) return <div className="loading">Loading dashboard...</div>;

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <p className="welcome-message">Welcome back, {user?.username}!</p>

      {/* Stats Cards Section */}
      <div className="admin-stats">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p>{stats.users}</p>
        </div>
        <div className="stat-card">
          <h3>Total Posts</h3>
          <p>{stats.posts}</p>
        </div>
        <div className="stat-card">
          <h3>Total Comments</h3>
          <p>{stats.comments}</p>
        </div>
      </div>

      {/* User Management Section */}
      <div className="admin-section">
        <h2>User Management</h2>
        <UserList />
      </div>

      {/* Recent Posts Section */}
      <div className="admin-section">
        <h2>Recent Posts</h2>
        {recentPosts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          <div className="recent-posts-list">
            {recentPosts.map(post => (
              <div key={post._id} className="recent-post-item">
                <div className="post-info">
                  <strong>{post.title}</strong>
                  <span> by {post.author?.username}</span>
                  <span className="post-date">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="post-actions">
                  <a href={`/edit-post/${post._id}`} className="btn-edit-small">Edit</a>
                  <button 
                    onClick={() => handleDeletePost(post._id)}
                    className="btn-delete-small"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions Section */}
      <div className="admin-section">
        <h2>Quick Actions</h2>
        <div className="quick-actions">
          <a href="/create-post" className="quick-action-btn">
            + Create New Post
          </a>
          <a href="/" className="quick-action-btn">
            View Site
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;