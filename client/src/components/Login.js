import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [loginPhoto, setLoginPhoto] = useState(null);
  const webcamRef = useRef(null);

  const captureLoginPhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setLoginPhoto(imageSrc);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('loginPhoto', loginPhoto);

      const response = await axios.post('http://localhost:5000/api/users/login', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Login successful:', response.data);
      alert('Login successful!');
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message || error.message);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={320}
            height={240}
          />
          <button type="button" onClick={captureLoginPhoto} className="btn">
            Capture Photo
          </button>
          {loginPhoto && (
            <img src={loginPhoto} alt="Login" style={{ marginTop: '1rem', width: '100%' }} />
          )}
        </div>
        <button type="submit" className="btn">Login</button>
      </form>
    </div>
  );
};

export default Login;