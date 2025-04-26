const express = require('express');
const multer = require('multer');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

router.post('/register', upload.fields([{ name: 'profilePhoto' }, { name: 'faceScan' }]), async (req, res) => {
  try {
    const { fullName, dateOfBirth, nationality, gender, email, phoneNumber, permanentAddress, governmentId, passportNumber, password, twoFactorAuth } = req.body;
    
    // Check if both images are uploaded
    if (!req.files || !req.files.profilePhoto || !req.files.faceScan) {
      return res.status(400).json({ message: 'Both Profile Photo and Face Scan are required.' });
    }

    const profilePhoto = req.files.profilePhoto[0].path;
    const faceScan = req.files.faceScan[0].path;

    console.log('Received data:', req.body);
    console.log('Uploaded files:', req.files);

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
      fullName,
      dateOfBirth,
      nationality,
      gender,
      email,
      phoneNumber,
      permanentAddress,
      governmentId,
      passportNumber,
      profilePhoto,
      faceScan,
      password: hashedPassword,
      twoFactorAuth,
    });

    await user.save();

    res.status(201).json({ message: 'User registered successfully!', user });
  } catch (error) {
    console.error('Registration failed:', error);
    res.status(500).json({ message: 'Registration failed. Please try again.', error: error.message });
  }
});

module.exports = router;
