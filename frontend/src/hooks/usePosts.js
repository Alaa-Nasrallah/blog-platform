import { useState, useEffect } from 'react';
import { postService } from '../services/postService';

export const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all posts
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await postService.getAllPosts();
      setPosts(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  // Get single post
  const getPost = async (id) => {
    try {
      setLoading(true);
      const data = await postService.getPostById(id);
      setError(null);
      return data;
    } catch (err) {
      setError(err.message || 'Failed to fetch post');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Create post
  const createPost = async (postData) => {
    try {
      setLoading(true);
      const data = await postService.createPost(postData);
      setPosts(prev => [data, ...prev]);
      setError(null);
      return { success: true, data };
    } catch (err) {
      setError(err.message || 'Failed to create post');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Update post
  const updatePost = async (id, postData) => {
    try {
      setLoading(true);
      const data = await postService.updatePost(id, postData);
      setPosts(prev => prev.map(p => p._id === id ? data : p));
      setError(null);
      return { success: true, data };
    } catch (err) {
      setError(err.message || 'Failed to update post');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Delete post
  const deletePost = async (id) => {
    try {
      setLoading(true);
      await postService.deletePost(id);
      setPosts(prev => prev.filter(p => p._id !== id));
      setError(null);
      return { success: true };
    } catch (err) {
      setError(err.message || 'Failed to delete post');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    loading,
    error,
    fetchPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
  };
};