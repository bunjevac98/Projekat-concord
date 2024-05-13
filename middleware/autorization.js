const User = require('../Models/user');

module.exports.isAdmin = async (req, res, next) => {
    const user = await User.findById(req.userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    if (user.role === 'Admin') {
        next();
    } else {
        // User is not authorized to access this resource
        res.status(403).json({ message: 'Unauthorized - Admin access required' });
    }
}