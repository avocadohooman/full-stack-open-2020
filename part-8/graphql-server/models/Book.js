const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')


const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    published: {
        type: Number,
        required: true,
    },
    author: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    genres: {
        type: [String],
        required: true,
    }
});

schema.plugin(uniqueValidator)
module.exports = mongoose.model('Book', schema);