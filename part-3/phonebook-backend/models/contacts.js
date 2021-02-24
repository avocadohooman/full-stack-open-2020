const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const url = process.env.MONGODB_URI

mongoose.connect(url, 
    {useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useFindAndModify: false, 
        useCreateIndex: true })
        .then(response => {
            console.log('connected to MongoDB')
        })
        .catch(error => {
            console.log('error connecting to MongoDB', error.message)
        })


const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: [3, 'Minimum length for name is 3'],
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        minlength: [8, 'Minium length for phone number is 8 digits'],
        required: true
    }
})
contactSchema.plugin(uniqueValidator);

contactSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Contact', contactSchema);
