const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

exports.uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: 'auto',
      folder: 'datasets'
    });
    fs.unlinkSync(filePath); // Remove temp file
    return {
      url: result.secure_url,
      format: result.format,
      size: result.bytes
    };
  } catch (err) {
    fs.unlinkSync(filePath); // Clean up if error
    throw err;
  }
};