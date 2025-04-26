// src/features/datasets/datasetSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Action for uploading datasets
export const uploadDataset = createAsyncThunk(
  'datasets/upload',
  async (formData, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await axios.post('/api/datasets', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${auth.user.token}`
        }
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Upload failed');
    }
  }
);

// Action for fetching ALL datasets (NEW)
export const fetchDatasets = createAsyncThunk(
  'datasets/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/datasets');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch datasets');
    }
  }
);

// Action for fetching admin datasets
export const fetchAdminDatasets = createAsyncThunk(
  'datasets/fetchAdmin',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await axios.get('/api/datasets/admin', {
        headers: {
          Authorization: `Bearer ${auth.user.token}`
        }
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch admin datasets');
    }
  }
);

const datasetSlice = createSlice({
  name: 'datasets',
  initialState: {
    items: [],          // Regular datasets
    adminItems: [],     // Admin datasets
    status: 'idle',     // Regular datasets status
    adminStatus: 'idle',// Admin datasets status
    uploadStatus: 'idle',
    error: null,
    adminError: null,
    uploadError: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Upload dataset cases
      .addCase(uploadDataset.pending, (state) => {
        state.uploadStatus = 'loading';
        state.uploadError = null;
      })
      .addCase(uploadDataset.fulfilled, (state, action) => {
        state.uploadStatus = 'succeeded';
        state.items.unshift(action.payload);
        state.adminItems.unshift(action.payload);
      })
      .addCase(uploadDataset.rejected, (state, action) => {
        state.uploadStatus = 'failed';
        state.uploadError = action.payload;
      })
      
      // Regular datasets cases (NEW)
      .addCase(fetchDatasets.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchDatasets.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchDatasets.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Admin datasets cases
      .addCase(fetchAdminDatasets.pending, (state) => {
        state.adminStatus = 'loading';
        state.adminError = null;
      })
      .addCase(fetchAdminDatasets.fulfilled, (state, action) => {
        state.adminStatus = 'succeeded';
        state.adminItems = action.payload;
      })
      .addCase(fetchAdminDatasets.rejected, (state, action) => {
        state.adminStatus = 'failed';
        state.adminError = action.payload;
      });
  }
});

// Export all selectors
export const selectAllDatasets = (state) => state.datasets.items;
export const selectDatasetStatus = (state) => state.datasets.status;
export const selectDatasetError = (state) => state.datasets.error;

export const selectAdminDatasets = (state) => state.datasets.adminItems;
export const selectAdminDatasetStatus = (state) => state.datasets.adminStatus;
export const selectAdminDatasetError = (state) => state.datasets.adminError;

export const selectUploadStatus = (state) => state.datasets.uploadStatus;
export const selectUploadError = (state) => state.datasets.uploadError;

export default datasetSlice.reducer;