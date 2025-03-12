// controllers/userController.js
const Customer = require('../models/customer');

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await Customer.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};