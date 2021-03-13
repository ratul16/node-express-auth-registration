const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true,
        min: 8,
        max: 255
    },
    id: {
        type: Number,
        required: true,
        min: 8,
        max: 255
    },
    title: {
        type: String,
        required: true,
        min: 8,
        max: 1024
    },
    body: {
        type: String,
        required: true,
        min: 8,
        max: 1024
    },

}, { timestamps: true });

module.exports = mongoose.model('posts', postSchema);