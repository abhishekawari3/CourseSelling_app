const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,          
        minlength: 3,
        maxlength: 20
    },

    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,    
        match: [/^\S+@\S+\.\S+$/, "Invalid email format"]
    },

    password: {
        type: String,
        required: true,
        minlength: 6
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Admins", adminSchema);