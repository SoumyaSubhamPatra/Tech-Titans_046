const express = require('express');
const { createRoom, joinRoom } = require('../controllers/roomController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const router = express.Router();

router.post('/create', authMiddleware, roleMiddleware(['organizer', 'admin']), createRoom);
router.post('/join', authMiddleware, joinRoom);

module.exports = router;
