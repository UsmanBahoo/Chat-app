const User = require('../models/User');

const UserController = {
    async createUser(req, res) {
        console.log('Creating user:', req.body);
        try {
            const { name, password, email } = req.body;
            const newUser = new User({ username: name, password, email });
            await newUser.save();

            // Emit user-list-updated event to all clients
            const io = req.app.get('io');
            if (io) {
                io.emit('user-list-updated');
            }

            res.status(201).json({ message: 'User created successfully', user: newUser });
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ message: 'Error creating user', error });
        }
    },
    
    async getUsers(req, res) {
        try {
        const users = await User.find();
        res.status(200).json(users);
        } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
        }
    },
    
    async getUserById(req, res) {
        try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
        } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
        }
    },
    
    async updateUser(req, res) {
        try {
        const { username, password, email } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { username, password, email },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
        } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
        }
    },
    
    async deleteUser(req, res) {
        try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
        }
    },

    async loginUser(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email, password });
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            console.log('User logged in:', user);
            res.status(200).json({ message: 'Login successful', user });

        } catch (error) {
            res.status(500).json({ message: 'Error logging in', error });
        }
    },

    async updateOnlineStatus(req, res) {
        try {
            const { userId, isOnline } = req.body;
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { isOnline },
                { new: true }
            );
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json({ message: 'Error updating online status', error });
        }
    }
}

module.exports = UserController;