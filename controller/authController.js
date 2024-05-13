const User = require('../Models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config()

const jwt_secret = process.env.JWT_SECRET

module.exports.signup = async (req, res, next) => {
    const { name, surname, username, password, email, age, dateOfBirth, gender } = req.body;
    const role = "User"
    try {
        // Check if username or email already exists
        let existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }
        const newUser = new User({
            name,
            surname,
            username,
            password,
            email,
            age,
            dateOfBirth,
            gender,
            role
        });
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);

        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error signing up:', error);
        res.status(500).json({ error: 'Failed to sign up' });
    }
};

module.exports.login = async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        //Now validating password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" })
        }

        //Creating JWT token
        const token = jwt.sign({ userId: user._id }, jwt_secret, { expiresIn: "1h" })
        res.json({ token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Failed to log in' });
    }
}

