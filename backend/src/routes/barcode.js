const express = require('express');
const auth = require('../middleware/auth');
const Inventory = require('../models/Inventory');

const router = express.Router();

// Generate barcode
router.post('/generate', auth, (req, res) => {
  try {
    const { code, format = 'EAN' } = req.body;
    
    // This would integrate with jsbarcode library
    // For now, just returning a placeholder
    res.json({
      barcode: code,
      format,
      message: 'Barcode generated successfully'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Search by barcode
router.get('/search/:code', auth, async (req, res) => {
  try {
    const inventory = await Inventory.findOne({
      company: req.user.company,
      'barcode.code': req.params.code
    });

    if (!inventory) {
      return res.status(404).json({ message: 'Barcode not found' });
    }

    res.json(inventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
