const mongoose = require('mongoose');

const datasetSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['Agriculture', 'Health', 'Education', 'Economy', 'Demographics', 'Environment']
  },
  price: { type: Number, required: true, min: 0 },
  currency: { type: String, default: 'USD' },
  fileUrl: { type: String, required: true },
  format: { type: String, required: true },
  size: { type: Number, required: true }, // in bytes
  publisher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isApproved: { type: Boolean, default: false },
  downloads: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Dataset', datasetSchema);