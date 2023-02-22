const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username: {
        type: String,
        requried: [true, "Please enter a username"]
    },
    email: {
        type: String,
        requried: true,
        unique: [true, "Email already exist"]
    },
    password: {
        type: String,
        required: [true, "Please enter a password"]
    }
})

module.exports = mongoose.model("User", userSchema);