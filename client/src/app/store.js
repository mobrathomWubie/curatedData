import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import datasetReducer from '../features/datasets/datasetSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    datasets: datasetReducer
  }
});
export default store;