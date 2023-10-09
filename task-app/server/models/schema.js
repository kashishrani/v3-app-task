const mongoose = require('mongoose');

const { v4: uuidv4 } = require('uuid');
uuidv4();

var userSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            required: true,
            maxlength: 32,
            trim: true,
        },

        last_name: {
            type: String,
            maxlength: 32,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },

        encry_password: {
            type: String,
            required: true,
        },

        salt: String,
    }
);

var taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: 'Title cannot be blank',
            trim: true
        },

        description: {
            type: String,
            default: '',
            trim: true
        },

        isCompleted: {
            type: Boolean,
            default: false
        },

        created_at: {
            type: Date,
            format: '%Y-%m-%d',
            default: Date.now,
            required: 'Must have start date - default value is the created date'
        },

        deadline: {
            type: Date,
            format: '%Y-%m-%d',
            required: true
        }
    }
);

exports.User = mongoose.model("User", userSchema);

exports.Task = mongoose.model("Task", taskSchema);
// module.exports = mongoose.model("User", userSchema);