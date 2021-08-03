const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
      minlength: 3
    },
    phone: {
      type: String,
      minlength: 3
    },
    street: {
      type: String,
      required: true,
      minlength: 3
    },
    city: {
      type: String,
      required: true,
      minlength: 3
    },
  })
  
  schema.plugin(uniqueValidator)
  module.exports = mongoose.model('Person', schema)