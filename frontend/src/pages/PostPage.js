import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { postService } from '../services/postService';
import { commentService } from '../services/commentService';
import { useAuth } from '../context/AuthContext';

const PostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin } = useAuth();
  
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [commentContent, setCommentContent] = useState('');
  const [commentRating, setCommentRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);

  // MOVE THIS FUNCTION ABOVE useEffect
  const fetchPostAndComments = async () => {
    try {
      setLoading(true);
      const [postData, commentsData] = await Promise.all([
        postService.getPostById(id),
        commentService.getComments(id)
      ]);
      setPost(postData);
      setComments(commentsData);
    } catch (err) {
      setError(err.message || 'Failed to load post');
    } finally {
      setLoading(false);
    }
  };

// Fixed infinite loop - only depend on id
  useEffect(() => {
    fetchPostAndComments();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await postService.deletePost(id);
        navigate('/');
      } catch (err) {
        alert('Failed to delete post');
      }
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated || isAdmin) {
      return;
    }

    setSubmitting(true);
    try {
      const newComment = await commentService.createComment(id, {
        content: commentContent,
        rating: commentRating
      });
      setComments([newComment, ...comments]);
      setCommentContent('');
      setCommentRating(5);
    } catch (err) {
      alert(err.message || 'Failed to post comment');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    console.log('🔍 Attempting to delete comment:', commentId);
    
    if (window.confirm('Delete this comment?')) {
      console.log('✅ User confirmed deletion');
      
      try {
        console.log('📤 Sending delete request to server...');
        const result = await commentService.deleteComment(commentId);
        console.log('✅ Server response:', result);
        
        console.log('🔄 Updating UI...');
        setComments(comments.filter(c => c._id !== commentId));
        console.log('✅ Comment removed from UI');
        
      } catch (err) {
        console.log('❌ ERROR:', err);
        alert('Failed to delete comment: ' + (err.message || 'Unknown error'));
      }
    } else {
      console.log('❌ User cancelled deletion');
    }
  };

  if (loading) return <div className="loading">Loading post...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!post) return <div className="error">Post not found</div>;

  return (
    <div className="post-page">
      <article className="post-full">
        <h1>{post.title}</h1>
        <div className="post-meta">
          <span>By {post.author?.username || 'Unknown'}</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
        
        {isAdmin && (
          <div className="admin-actions">
            <Link to={`/edit-post/${post._id}`} className="btn-edit">Edit Post</Link>
            <button onClick={handleDelete} className="btn-delete">Delete Post</button>
          </div>
        )}
        
        <div className="post-content">
          {post.content}
        </div>
      </article>

      <section className="comments-section">
        <h2>Comments ({comments.length})</h2>
        
        {/* Show comment form ONLY for regular users, NOT for admins */}
        {isAuthenticated && !isAdmin ? (
          <form onSubmit={handleCommentSubmit} className="comment-form">
            <h3>Leave a Comment</h3>
            <div className="form-group">
              <label>Rating</label>
              <select 
                value={commentRating} 
                onChange={(e) => setCommentRating(parseInt(e.target.value))}
                required
              >
                {[5,4,3,2,1].map(num => (
                  <option key={num} value={num}>{num} Star{num !== 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Comment</label>
              <textarea
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                required
                rows="3"
                placeholder="Write your comment here..."
              />
            </div>
            <button type="submit" className="btn-submit" disabled={submitting}>
              {submitting ? 'Posting...' : 'Post Comment'}
            </button>
          </form>
        ) : isAuthenticated && isAdmin ? (
          /* Admins see nothing - no comment form, no message */
          <div style={{ display: 'none' }}></div>
        ) : (
          <div style={{ 
            textAlign: 'center', 
            padding: '20px', 
            background: '#f8f9fa', 
            borderRadius: '8px', 
            marginBottom: '20px',
            border: '1px solid #e0e0e0'
          }}>
            <p style={{ margin: 0 }}>
              <Link to="/login" style={{ color: '#3498db', textDecoration: 'none' }}>Login</Link> to leave a comment
            </p>
          </div>
        )}

        <div className="comments-list">
          {comments.length === 0 ? (
            <p className="no-comments">No comments yet. Be the first to comment!</p>
          ) : (
            comments.map(comment => (
              <div key={comment._id} className="comment-card">
                <div className="comment-header">
                  <span className="comment-author">{comment.author?.username}</span>
                  <span className="comment-rating">{'⭐'.repeat(comment.rating)}</span>
                  <span className="comment-date">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="comment-content">{comment.content}</p>
                {isAdmin && (
                  <button 
                    onClick={() => handleDeleteComment(comment._id)}
                    className="btn-delete-comment"
                  >
                    Delete Comment
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default PostPage;