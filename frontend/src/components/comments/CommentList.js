import React from 'react';
import CommentItem from './CommentItem';

const CommentList = ({ comments, onDeleteComment, isAdmin }) => {
  if (!comments || comments.length === 0) {
    return <p className="no-comments">No comments yet. Be the first to comment!</p>;
  }

  return (
    <div className="comments-list">
      {comments.map((comment) => (
        <CommentItem 
          key={comment._id} 
          comment={comment} 
          onDelete={onDeleteComment}
          isAdmin={isAdmin}
        />
      ))}
    </div>
  );
};

export default CommentList;
