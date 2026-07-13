const express = require('express');
const User = require('../models/User');
const Company = require('../models/Company');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

const router = express.Router();

// Get all company employees
router.get('/users', auth, roleCheck(['admin']), async (req, res) => {
  try {
    const users = await User.find({ company: req.user.company })
      .select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add user (by admin)
router.post('/users', auth, roleCheck(['admin']), async (req, res) => {
  try {
    const { firstName, lastName, email, password, role, permissions } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({
      firstName,
      lastName,
      email,
      password,
      role,
      permissions,
      company: req.user.company
    });

    await user.save();
    res.status(201).json(user.toJSON());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user
router.put('/users/:id', auth, roleCheck(['admin']), async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id, company: req.user.company },
      req.body,
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.toJSON());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete user
router.delete('/users/:id', auth, roleCheck(['admin']), async (req, res) => {
  try {
    const user = await User.findOneAndDelete({
      _id: req.params.id,
      company: req.user.company
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get company settings
router.get('/settings', auth, roleCheck(['admin']), async (req, res) => {
  try {
    const company = await Company.findById(req.user.company);
    res.json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update company settings
router.put('/settings', auth, roleCheck(['admin']), async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(
      req.user.company,
      req.body,
      { new: true }
    );
    res.json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
