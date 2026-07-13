const express = require('express');
const Alert = require('../models/Alert');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all alerts for user
router.get('/', auth, async (req, res) => {
  try {
    const alerts = await Alert.find({
      $or: [
        { company: req.user.company },
        { recipient: req.user.id }
      ]
    })
      .populate('inventory')
      .populate('recipient', 'firstName lastName email')
      .sort({ createdAt: -1 });
    
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get unread alerts
router.get('/unread', auth, async (req, res) => {
  try {
    const alerts = await Alert.find({
      recipient: req.user.id,
      isRead: false
    })
      .populate('inventory')
      .sort({ createdAt: -1 });
    
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Mark alert as read
router.put('/:id/read', auth, async (req, res) => {
  try {
    const alert = await Alert.findByIdAndUpdate(
      req.params.id,
      { isRead: true, readAt: new Date() },
      { new: true }
    );

    res.json(alert);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Acknowledge alert
router.put('/:id/acknowledge', auth, async (req, res) => {
  try {
    const alert = await Alert.findByIdAndUpdate(
      req.params.id,
      {
        isAcknowledged: true,
        acknowledgedAt: new Date(),
        acknowledgedBy: req.user.id
      },
      { new: true }
    );

    res.json(alert);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
