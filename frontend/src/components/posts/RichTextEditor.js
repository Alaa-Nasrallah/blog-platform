import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';

const RichTextEditor = ({ value, onChange, disabled = false }) => {
  
  const handleImageUpload = async (blobInfo) => {
    const formData = new FormData();
    formData.append('image', blobInfo.blob(), blobInfo.filename());
    
    try {
      const token = localStorage.getItem('token');
      
      const response = await axios.post('/api/upload/image', formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          'Authorization': token ? `Bearer ${token}` : ''
        },
      });
      
      console.log('✅ Image uploaded. URL:', response.data.location);
      
      // TinyMCE expects the URL string
      return response.data.location;
    } catch (error) {
      console.error('❌ Upload failed:', error);
      throw new Error('Image upload failed: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="rich-text-editor">
      <Editor
        apiKey='62ff52qjkaabv3qd5pm4amvur1b4n0ufaw511uea48z1h0jr'
        value={value}
        onEditorChange={onChange}
        disabled={disabled}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'dragdrop',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'help', 'wordcount', 'paste'
          ],
          drag_drop: true,
          paste_data_images: true,
          images_reuse_filename: false,
          toolbar: 'undo redo | blocks | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help | image',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          
          // Image upload configuration
          automatic_uploads: true,
          images_upload_handler: handleImageUpload,
          
          // Fix for image dimensions issue
          image_dimensions: false,
          image_advtab: true,
          
          // Add this to help with loading
          images_upload_url: '/api/upload/image',
          
          // Convert URLs to absolute (uses current origin)
          relative_urls: false,
          remove_script_host: false,
          convert_urls: true,
        }}
      />
    </div>
  );
};

export default RichTextEditor;