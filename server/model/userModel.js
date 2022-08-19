const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, "UserId is required"]
    },
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    mobile: {
        type: String,
        required: [true, "Mobile is required"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    dob: {
        type: String,
        required: [true, "Date of birth required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    isAdmin: {
        type: Boolean,
        required:  [true, "isAdmin is required"],
        default: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("User", userSchema)