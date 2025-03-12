// routes/authRoutes.js
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const authController = require('../controllers/authController');
const Customer = require('../models/customer');

// Signup route
router.post('/signup', [
  // Validation rules
  body('fullName').trim().notEmpty().withMessage('Full name is required'),
  body('email').trim().isEmail().withMessage('Valid email is required')
    .custom(async value => {
      const existingUser = await Customer.findOne({ email: value });
      if (existingUser) {
        throw new Error('Email already in use');
      }
      return true;
    }),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], authController.signup);

// Login route
router.post('/login', authController.login);

module.exports = router;