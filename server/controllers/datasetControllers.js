const Dataset = require('../models/dataset');

exports.uploadDataset = async (req, res) => {
  try {
    const dataset = new Dataset({
      ...req.body,
      fileUrl: req.file.path,
      format: req.file.mimetype,
      size: req.file.size,
      publisher: req.user.id,
      isApproved: req.user.role === 'admin' // Auto-approve admin uploads
    });

    await dataset.save();
    res.status(201).json(dataset);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getPublicDatasets = async (req, res) => {
  try {
    const datasets = await Dataset.find({ isApproved: true })
      .populate('publisher', 'name email')
      .sort('-createdAt');
    res.json(datasets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};