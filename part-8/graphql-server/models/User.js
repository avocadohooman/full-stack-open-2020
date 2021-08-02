const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: [3, "Username needs to have at least 3 characters"]
    }
});


schema.plugin(uniqueValidator);
module.exports = mongoose.model('User', schema);
