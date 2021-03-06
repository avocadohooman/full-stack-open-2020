const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: { 
     type: String,
     reuired: true   
    },
    author: { 
        type: String,
        reuired: true   
    },
    url: { 
        type: String,
        reuired: true   
    },
    likes: { 
        type: Number,
        reuired: false   
    }
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Blog', blogSchema)
