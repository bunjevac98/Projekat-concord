const jwt = require("jsonwebtoken")
require("dotenv").config()

const jwt_secret = process.env.JWT_SECRET

module.exports.authenticate = (req, res, next) => {
    const token = req.headers["authorization"].split(" ");

    console.log("JWT KEY-->", token[1])
    //Check if there is token in header
    if (!token[1]) {
        return res.status(401).json({ message: "No token, authorization denied" })
    }
    try {

        //naravno promeniti secret key u neki normalan i dodati u .env
        const decoded = jwt.verify(token[1], jwt_secret)

        req.userId = decoded.userId;

        next();//ovaj next je bitan vrv da prelazi na sledeci midelware
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(401).json({ message: 'Invalid token' });
    }
};