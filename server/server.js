// Add these after your existing routes
const datasetRoutes = require('./routes/datasetRoutes');
app.use('/api/datasets', datasetRoutes);

// Error handling middleware (add at the end)
app.use((err, req, res, next) => {
  if (err.name === 'MulterError') {
    return res.status(400).json({ message: 'File upload error' });
  }
  // Your existing error handling
});