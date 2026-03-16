import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { postService } from '../services/postService';
import RichTextEditor from '../components/posts/RichTextEditor';

const EditPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: ''
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
  fetchPost();
}, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchPost = async () => {
    try {
      const post = await postService.getPostById(id);
      setFormData({
        title: post.title,
        summary: post.summary,
        content: post.content
      });
    } catch (err) {
      setError('Failed to load post');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleContentChange = (content) => {
    setFormData({
      ...formData,
      content
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      await postService.updatePost(id, formData);
      navigate(`/posts/${id}`);
    } catch (err) {
      setError(err.message || 'Failed to update post');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="loading">Loading post...</div>;

  return (
    <div className="form-container" style={{ maxWidth: '800px' }}>
      <h2>Edit Post</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="summary">Summary</label>
          <textarea
            id="summary"
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            required
            rows="3"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <RichTextEditor 
            value={formData.content} 
            onChange={handleContentChange}
          />
        </div>
        
        <button 
          type="submit" 
          className="btn-submit"
          disabled={submitting}
        >
          {submitting ? 'Updating...' : 'Update Post'}
        </button>
        
        <button 
          type="button" 
          onClick={() => navigate(`/posts/${id}`)}
          style={{
            width: '100%',
            padding: '12px',
            marginTop: '10px',
            backgroundColor: '#95a5a6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditPostPage;