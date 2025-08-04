const express = require('express');
const router = express.Router();
const { createRoom, getRooms } = require('../controllers/room.controller');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createRoom);
router.get('/', getRooms);

module.exports = router;
