import React from 'react';
import PostCard from './PostCard';

const PostList = ({ posts, onDeletePost, loading, error }) => {
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="no-posts-container">
        <p className="no-posts-message">No posts yet. Check back soon!</p>
      </div>
    );
  }

  return (
    <div className="posts-list">
      <div className="posts-grid">
        {posts.map(post => (
          <PostCard 
            key={post._id} 
            post={post} 
            onDelete={onDeletePost}
          />
        ))}
      </div>
    </div>
  );
};

export default PostList;