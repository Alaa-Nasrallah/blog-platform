import React from 'react';

const StarRating = ({ rating, onRatingChange, readOnly = false }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="star-rating">
      {stars.map((star) => (
        <span
          key={star}
          className={`star ${star <= rating ? 'filled' : ''} ${readOnly ? 'readonly' : ''}`}
          onClick={() => !readOnly && onRatingChange && onRatingChange(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
