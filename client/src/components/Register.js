import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import axios from 'axios';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    nationality: '',
    gender: '',
    email: '',
    phoneNumber: '',
    permanentAddress: '',
    governmentId: '',
    passportNumber: '',
    password: '',
    twoFactorAuth: false,
  });

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [faceScan, setFaceScan] = useState(null);
  const [errors, setErrors] = useState({});
  const webcamRef = useRef(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    setErrors({ ...errors, [name]: '' });
  };

  const captureFaceScan = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      fetch(imageSrc)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], 'face_scan.jpg', { type: 'image/jpeg' });
          setFaceScan(file);
        });
    }
  };

  const handleFileChange = (e) => {
    setProfilePhoto(e.target.files[0]);
  };

  const validateForm = () => {
    const newErrors = {};
    // Validation logic remains the same
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    data.append('profilePhoto', profilePhoto);
    data.append('faceScan', faceScan);

    try {
      await axios.post('http://127.0.0.1:5000/api/users/register', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      navigate('/', { state: { message: 'Registration successful!' } });
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="register-container">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Personal Information Section */}
        <div className="form-section">
          <h3>Personal Information</h3>
          <div className="form-group">
            <label>Full Name*</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
            {errors.fullName && <span className="error">{errors.fullName}</span>}
          </div>

          <div className="form-group">
            <label>Date of Birth*</label>
            <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
            {errors.dateOfBirth && <span className="error">{errors.dateOfBirth}</span>}
          </div>

          <div className="form-group">
            <label>Nationality*</label>
            <input type="text" name="nationality" value={formData.nationality} onChange={handleChange} />
            {errors.nationality && <span className="error">{errors.nationality}</span>}
          </div>

          <div className="form-group">
            <label>Gender*</label>
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <span className="error">{errors.gender}</span>}
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="form-section">
          <h3>Contact Information</h3>
          <div className="form-group">
            <label>Email*</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Phone Number*</label>
            <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
            {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
          </div>

          <div className="form-group">
            <label>Permanent Address*</label>
            <textarea name="permanentAddress" value={formData.permanentAddress} onChange={handleChange} />
            {errors.permanentAddress && <span className="error">{errors.permanentAddress}</span>}
          </div>
        </div>

        {/* Identification Section */}
        <div className="form-section">
          <h3>Identification</h3>
          <div className="form-group">
            <label>Government ID*</label>
            <input type="text" name="governmentId" value={formData.governmentId} onChange={handleChange} />
            {errors.governmentId && <span className="error">{errors.governmentId}</span>}
          </div>

          <div className="form-group">
            <label>Passport Number</label>
            <input type="text" name="passportNumber" value={formData.passportNumber} onChange={handleChange} />
          </div>
        </div>

        {/* Biometrics Section */}
        <div className="form-section">
          <h3>Biometrics</h3>
          <div className="form-group">
            <label>Face Scan*</label>
            <Webcam ref={webcamRef} screenshotFormat="image/jpeg" className="webcam-preview" />
            <button type="button" className="capture-button" onClick={captureFaceScan}>
              Capture Face Scan
            </button>
            {errors.faceScan && <span className="error">{errors.faceScan}</span>}
          </div>

          <div className="form-group">
            <label>Profile Photo*</label>
            <input type="file" accept="image/*" onChange={handleFileChange} className="file-input" />
            {errors.profilePhoto && <span className="error">{errors.profilePhoto}</span>}
          </div>
        </div>

        {/* Security Section */}
        <div className="form-section">
          <h3>Security</h3>
          <div className="form-group">
            <label>Password*</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <div className="checkbox-group">
            <input
              type="checkbox"
              name="twoFactorAuth"
              checked={formData.twoFactorAuth}
              onChange={handleChange}
            />
            <label>Enable Two-Factor Authentication</label>
          </div>
        </div>

        <button type="submit" className="submit-button">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;