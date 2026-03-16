import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postService } from '../services/postService';
import RichTextEditor from '../components/posts/RichTextEditor';

const CreatePostPage = () => {
  const [formData, setFormData] = useState({ 
    title: '', 
    summary: '', 
    content: '' 
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContentChange = (content) => {
    setFormData({ ...formData, content });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await postService.createPost(formData);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container" style={{ maxWidth: '800px' }}>
      <h2>Create New Post</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input 
            type="text" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            required 
            placeholder="Enter post title"
          />
        </div>
        
        <div className="form-group">
          <label>Summary</label>
          <textarea 
            name="summary" 
            value={formData.summary} 
            onChange={handleChange} 
            required 
            rows="3"
            placeholder="Brief summary of your post"
          />
        </div>
        
        <div className="form-group">
          <label>Content</label>
          <RichTextEditor 
            value={formData.content} 
            onChange={handleContentChange}
          />
        </div>
        
        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Post'}
        </button>
        
        <button 
          type="button" 
          className="btn-cancel" 
          onClick={() => navigate('/')}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CreatePostPage;