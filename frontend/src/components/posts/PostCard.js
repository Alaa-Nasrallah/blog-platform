import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PostCard = ({ post, onDelete }) => {
  const { isAdmin } = useAuth();
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="post-card">
      <div className="post-card-content">
        <h3>{post.title}</h3>
        <p className="post-summary">{post.summary}</p>
        
        <div className="post-meta">
          <span className="post-author">
            By {post.author?.username || 'Unknown'}
          </span>
          <span className="post-date">
            {formatDate(post.createdAt)}
          </span>
        </div>

        <div className="post-actions">
          <Link to={`/posts/${post._id}`} className="read-more">
            Read More →
          </Link>
          
          {isAdmin && (
            <div className="admin-post-actions">
              <Link to={`/edit-post/${post._id}`} className="btn-edit-small">
                Edit
              </Link>
              <button 
                onClick={() => onDelete(post._id)}
                className="btn-delete-small"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;