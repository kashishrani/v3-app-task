const mongoose = require('mongoose');

const { v4: uuidv4 } = require('uuid');
uuidv4();

var taskSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
            maxlength: 32,
            trim: true,
        },

        task_name: {
            type: String,
            maxlength: 32,
            trim: true,
        },

        isCompleted: {
            type: Boolean,
            default: false
        },
        created_at: {
            type: Date,
            default: Date.now
        },
        deadline: {
            type: Date,
            required: true
        }
    }
);

module.exports = mongoose.model("User", userSchema);