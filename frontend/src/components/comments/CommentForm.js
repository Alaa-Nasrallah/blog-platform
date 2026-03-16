import React, { useState } from 'react';
import StarRating from './StarRating';

const CommentForm = ({ onSubmit }) => {
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    
    setSubmitting(true);
    try {
      await onSubmit({ content, rating });
      setContent('');
      setRating(5);
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <h3>Leave a Comment</h3>
      <div className="form-group">
        <label>Rating</label>
        <StarRating rating={rating} onRatingChange={setRating} />
      </div>
      <div className="form-group">
        <label>Comment</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your comment here..."
          required
          rows="4"
        />
      </div>
      <button type="submit" className="btn-submit" disabled={submitting}>
        {submitting ? 'Posting...' : 'Post Comment'}
      </button>
    </form>
  );
};

export default CommentForm;
