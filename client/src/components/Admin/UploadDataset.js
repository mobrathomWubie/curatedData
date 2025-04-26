// src/components/Admin/UploadDataset.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  uploadDataset,
  selectUploadStatus,
  selectUploadError
} from '../../features/datasets/datasetSlice';

const UploadDataset = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Agriculture',
    price: 0,
    file: null
  });

  const uploadStatus = useSelector(selectUploadStatus);
  const uploadError = useSelector(selectUploadError);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('category', formData.category);
    data.append('price', formData.price);
    data.append('dataset', formData.file);

    dispatch(uploadDataset(data));
  };

  return (
    <div className="upload-container">
      <h2>Upload Dataset</h2>
      
      {uploadStatus === 'failed' && (
        <div className="alert alert-danger">{uploadError}</div>
      )}
      
      {uploadStatus === 'succeeded' && (
        <div className="alert alert-success">
          Dataset uploaded successfully!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
          />
        </div>

        <div className="form-group">
          <label>Category *</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="Agriculture">Agriculture</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
          </select>
        </div>

        <div className="form-group">
          <label>Price (USD)</label>
          <input
            type="number"
            name="price"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Dataset File *</label>
          <input
            type="file"
            onChange={handleFileChange}
            required
          />
        </div>

        <button 
          type="submit" 
          disabled={uploadStatus === 'loading'}
          className="btn btn-primary"
        >
          {uploadStatus === 'loading' ? 'Uploading...' : 'Upload Dataset'}
        </button>
      </form>
    </div>
  );
};

export default UploadDataset;