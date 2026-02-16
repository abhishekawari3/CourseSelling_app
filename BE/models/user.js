const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 20,
        trim: true,
        lowercase: true
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
    },

    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        trim: true
    }

}, {
    timestamps: true
});

const Users = mongoose.model('Users', usersSchema);

module.exports = Users;
