const express = require('express');
const router = express.Router();
const MessageController = require('../controllers/MessageController');

// Get all messages between two users
router.get('/:user1/:user2', MessageController.getMessagesBetweenUsers);

// Send (save) a new message
router.post('/', MessageController.sendMessage);

module.exports = router;