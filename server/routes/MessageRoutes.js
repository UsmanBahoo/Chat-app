const express = require('express');
const messageRouter = express.Router();
const MessageController = require('../controllers/MessageController');

// Get all messages between two users
messageRouter.get('/:user1/:user2', MessageController.getMessagesBetweenUsers);

// Send (save) a new message
messageRouter.post('/', MessageController.createMessage);

module.exports = messageRouter;