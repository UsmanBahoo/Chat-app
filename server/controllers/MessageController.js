
const Message = require('../models/Message');

const MessageController = {
    async createMessage(req, res) {
        try {
            const { sender, to, content } = req.body;
            const newMessage = new Message({ sender, to, content });
            await newMessage.save();
            res.status(201).json({ message: 'Message sent successfully', message: newMessage });
        } catch (error) {
            console.error('Error sending message:', error);
            res.status(500).json({ message: 'Error sending message', error });
        }
    },

    async getMessages(req, res) {
        try {
            const messages = await Message.find();
            res.status(200).json(messages);
        } catch (error) {
            console.error('Error fetching messages:', error);
            res.status(500).json({ message: 'Error fetching messages', error });
        }
    },

    async getMessagesByUser(req, res) {
        try {
            const { userId } = req.params;
            const messages = await Message.find({ $or: [{ sender: userId }, { to: userId }] });
            res.status(200).json(messages);
        } catch (error) {
            console.error('Error fetching messages:', error);
            res.status(500).json({ message: 'Error fetching messages', error });
        }
    },

    async deleteMessage(req, res) {
        try {
            const deletedMessage = await Message.findByIdAndDelete(req.params.id);
            if (!deletedMessage) {
                return res.status(404).json({ message: 'Message not found' });
            }
            res.status(200).json({ message: 'Message deleted successfully' });
        } catch (error) {
            console.error('Error deleting message:', error);
            res.status(500).json({ message: 'Error deleting message', error });
        }
    },

    async updateMessage(req, res) {
        try {
            const { content } = req.body;
            const updatedMessage = await Message.findByIdAndUpdate(
                req.params.id,
                { content },
                { new: true }
            );
            if (!updatedMessage) {
                return res.status(404).json({ message: 'Message not found' });
            }
            res.status(200).json(updatedMessage);
        } catch (error) {
            console.error('Error updating message:', error);
            res.status(500).json({ message: 'Error updating message', error });
        }
    },

    async getMessagesBetweenUsers(req, res) {
        try {
            const { user1, user2 } = req.params;
            const messages = await Message.find({
                $or: [
                    { sender: user1, to: user2 },
                    { sender: user2, to: user1 }
                ]
            });
            res.status(200).json(messages);
        } catch (error) {
            console.error('Error fetching messages:', error);
            res.status(500).json({ message: 'Error fetching messages', error });
        }
    }
};