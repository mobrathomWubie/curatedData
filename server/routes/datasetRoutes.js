const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const { 
  uploadDataset, 
  searchDatasets 
} = require('../controllers/datasetController');
const upload = require('../utils/multer'); // You'll need to set up multer

router.post(
  '/',
  protect,
  admin,
  upload.single('datasetFile'),
  uploadDataset
);

router.get('/', searchDatasets);

module.exports = router;