import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RichTextEditor from './RichTextEditor';

const PostForm = ({ initialData = {}, onSubmit, isEditing = false }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    summary: initialData.summary || '',
    content: initialData.content || ''
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }
    
    if (!formData.summary.trim()) {
      newErrors.summary = 'Summary is required';
    } else if (formData.summary.length < 10) {
      newErrors.summary = 'Summary must be at least 10 characters';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    } else if (formData.content.length < 20) {
      newErrors.content = 'Content must be at least 20 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleContentChange = (content) => {
    setFormData(prev => ({ ...prev, content }));
    if (errors.content) {
      setErrors(prev => ({ ...prev, content: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <h2>{isEditing ? 'Edit Post' : 'Create New Post'}</h2>
      
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={errors.title ? 'error' : ''}
          placeholder="Enter post title"
          disabled={submitting}
        />
        {errors.title && <span className="error-text">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="summary">Summary</label>
        <textarea
          id="summary"
          name="summary"
          value={formData.summary}
          onChange={handleChange}
          className={errors.summary ? 'error' : ''}
          placeholder="Brief summary of your post"
          rows="3"
          disabled={submitting}
        />
        {errors.summary && <span className="error-text">{errors.summary}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="content">Content</label>
        <RichTextEditor
          value={formData.content}
          onChange={handleContentChange}
          disabled={submitting}
        />
        {errors.content && <span className="error-text">{errors.content}</span>}
      </div>

      <div className="form-actions">
        <button 
          type="submit" 
          className="btn-submit"
          disabled={submitting}
        >
          {submitting ? (isEditing ? 'Updating...' : 'Creating...') : (isEditing ? 'Update Post' : 'Create Post')}
        </button>
        
        <button 
          type="button" 
          className="btn-cancel"
          onClick={() => navigate(-1)}
          disabled={submitting}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default PostForm;