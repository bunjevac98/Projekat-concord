const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt")


const userSchema = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    username: { type: String, required: true },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number
    },
    dateOfBirth: {
        type: Date,
        default: Date.now
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'] // Optional: Use enum to restrict values to a specific set
    },
    role: {
        type: String,
        enum: ["Admin", "User"],
        default: "User"
    }

});
//ovo nije dobro jer mozda moze dase presretne sifra pre 
/*
userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();

    try {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        return next();
    } catch (error) {
        return next(error);
    }
});
*/

const User = mongoose.model('User', userSchema);

module.exports = User;