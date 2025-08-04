const express = require('express');
const router = express.Router();
const { createBooking, getBookings } = require('../controllers/booking.controller');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createBooking);
router.get('/', protect, getBookings);

module.exports = router;
