// routes/roomRoutes.js

const express = require('express');
const { createRoom, joinRoom, getRoom } = require('../controllers/roomController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const router = express.Router();

// Route to create a room
router.post('/create', authMiddleware, roleMiddleware(['organizer', 'admin']), createRoom);

// Route to join a room
router.post('/join', authMiddleware, joinRoom);

// Route to get room details by roomId
router.get('/:roomId', authMiddleware, getRoom); // Ensure authMiddleware is used for authentication

module.exports = router;
