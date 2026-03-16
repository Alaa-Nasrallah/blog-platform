import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { postService } from '../services/postService';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAdmin } = useAuth();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const data = await postService.getAllPosts();
      setPosts(data);
    } catch (err) {
      setError(err.message || 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this post?')) {
      try {
        await postService.deletePost(id);
        setPosts(posts.filter(post => post._id !== id));
      } catch (err) {
        alert('Failed to delete post');
      }
    }
  };

  if (loading) return <div className="loading">Loading posts...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="home-page">
      <div className="home-header">
        <h1>Latest Blog Posts</h1>
        {isAdmin && (
          <Link to="/create-post" className="btn-create">
            + New Post
          </Link>
        )}
      </div>
      
      {posts.length === 0 ? (
        <p className="no-posts">No posts yet.</p>
      ) : (
        <div className="posts-grid">
          {posts.map(post => (
            <div key={post._id} className="post-card">
              <h3>{post.title}</h3>
              <p className="post-summary">{post.summary}</p>
              <p className="post-meta">
                By {post.author?.username} • {new Date(post.createdAt).toLocaleDateString()}
              </p>
              <div className="post-actions">
                <Link to={`/posts/${post._id}`} className="read-more">
                  Read More →
                </Link>
                {isAdmin && (
                  <>
                    <Link to={`/edit-post/${post._id}`}>Edit</Link>
                    <button onClick={() => handleDelete(post._id)}>Delete</button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;