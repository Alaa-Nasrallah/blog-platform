import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PostDetail = ({ post, onDelete }) => {
  const { isAdmin } = useAuth();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!post) return null;

  return (
    <article className="post-detail">
      <h1>{post.title}</h1>
      
      <div className="post-detail-meta">
        <span className="post-detail-author">
          By {post.author?.username || 'Unknown'}
        </span>
        <span className="post-detail-date">
          Published on {formatDate(post.createdAt)}
        </span>
        {post.updatedAt !== post.createdAt && (
          <span className="post-detail-updated">
            Updated on {formatDate(post.updatedAt)}
          </span>
        )}
      </div>

      {isAdmin && (
        <div className="post-detail-actions">
          <Link to={`/edit-post/${post._id}`} className="btn-edit">
            Edit Post
          </Link>
          <button onClick={() => onDelete(post._id)} className="btn-delete">
            Delete Post
          </button>
        </div>
      )}

      <div className="post-detail-content">
        {post.content}
      </div>
    </article>
  );
};

export default PostDetail;