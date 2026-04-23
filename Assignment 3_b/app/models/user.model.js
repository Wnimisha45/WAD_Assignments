const mongoose = require('mongoose');

// Define the schema for a User
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"]
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt
});

// Export the model
module.exports = mongoose.model('User', userSchema);
