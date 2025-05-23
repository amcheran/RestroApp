const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');


// POST /api/messages → Send a message
router.post('/s', messageController.sendMessage);

// GET /api/messages → Get all messages for the current user
router.get('/', messageController.getMessages);

// GET /api/messages/broadcast → Get all general messages (receiver_id = NULL)
router.get('/broadcast', messageController.getBroadcasts);

module.exports = router;
