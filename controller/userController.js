const User = require('../Models/user');
const bcrypt = require('bcrypt');

//Read all user
module.exports.seeAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }
        // Sending arr of user
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
}

module.exports.seeProfile = async (req, res) => {
    const userId = req.userId;
    console.log("userId je -->", userId);

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
}


//Update
//This can do every user
module.exports.updateUser = async (req, res, next) => {
    const { id } = req.params;
    const updates = req.body;
    console.log("Id OVOG CIJI SE MENJA", id)
    if (id !== req.userId) {
        return res.status(403).json({ message: "Unauthorized - You are not allowed to update this user" });
    }
    try {
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({ message: "User not found" })

        }
        if ("password" in updates && updates.password !== user.password) {
            const hashedPassword = await bcrypt.hash(updates.password, 10); // You can adjust the salt rounds (e.g., 10)
            updates.password = hashedPassword;
        }
        const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedUser) {
            return res.status(403).json({ message: "Unauthorized - You are not allowed to update this user" })
        }
        res.json(updatedUser);

    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Failed to update user' });
    }
    /*
    try {
        const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" })
        }
        res.json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Failed to update user' });
    }*/
}
//Delete all user
//This can do just admin
module.exports.deleteUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(id)

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error deliting user:', error);
        res.status(500).json({ error: 'Failed to delete user' });
    }
}