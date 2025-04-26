const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'], // Custom error message
    trim: true, // Remove extra spaces
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of birth is required'],
    validate: {
      validator: function (value) {
        // Ensure the date is in the past
        return value < new Date();
      },
      message: 'Date of birth must be in the past',
    },
  },
  nationality: {
    type: String,
    required: [true, 'Nationality is required'],
    trim: true,
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: {
      values: ['male', 'female', 'other'], // Allowed values
      message: 'Gender must be either male, female, or other', // Custom error message
    },
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true, // Ensure email is unique
    trim: true,
    lowercase: true, // Convert email to lowercase
    validate: {
      validator: function (value) {
        // Simple email validation regex
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: 'Invalid email address', // Custom error message
    },
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    validate: {
      validator: function (value) {
        // Simple phone number validation regex
        return /^[0-9]{10,15}$/.test(value); // Allow 10-15 digits
      },
      message: 'Invalid phone number', // Custom error message
    },
  },
  permanentAddress: {
    type: String,
    required: [true, 'Permanent address is required'],
    trim: true,
  },
  governmentId: {
    type: String,
    required: [true, 'Government ID is required'],
    trim: true,
  },
  passportNumber: {
    type: String,
    trim: true,
    default: null, // Optional field
  },
  profilePhoto: {
    type: String, // Store the file path or URL
    required: [true, 'Profile photo is required'],
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long'], // Minimum length
  },
  twoFactorAuth: {
    type: Boolean,
    default: false, // Default value
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the creation date
  },
});

// Export the model
module.exports = mongoose.model('User', UserSchema);