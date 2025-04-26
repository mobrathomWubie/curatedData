module.exports = (req, res, next) => {
  // Must be used after auth middleware
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      error: 'Admin privileges required'
    });
  }
  next();
};