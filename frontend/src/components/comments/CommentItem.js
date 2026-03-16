import React from 'react';
import StarRating from './StarRating';

const CommentItem = ({ comment, onDelete, isAdmin }) => {
  return (
    <div className="comment-item">
      <div className="comment-header">
        <div className="comment-author-info">
          <span className="comment-author">{comment.author?.username || 'Anonymous'}</span>
          <span className="comment-date">
            {new Date(comment.createdAt).toLocaleDateString()}
          </span>
        </div>
        <StarRating rating={comment.rating} readOnly={true} />
      </div>
      <div className="comment-content">
        <p>{comment.content}</p>
      </div>
      {isAdmin && (
        <div className="comment-actions">
          <button onClick={() => onDelete(comment._id)} className="btn-delete-comment">
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentItem;
