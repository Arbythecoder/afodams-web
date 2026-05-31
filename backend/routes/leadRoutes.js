const express = require('express');
const router = express.Router();
const { createLead, getLeads, updateLeadStatus } = require('../controllers/leadController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Public — anyone can submit a lead
router.post('/', createLead);

// Admin only
router.get('/', protect, authorize('admin'), getLeads);
router.patch('/:id/status', protect, authorize('admin'), updateLeadStatus);

module.exports = router;
