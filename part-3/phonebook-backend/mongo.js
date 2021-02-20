const mongoose = require('mongoose');

if (process.argv.length < 3 || process.argv.length > 5) {
    console.log('Usage: \nnode mongo.js <password> <name> <phone number>');
    process.exit(1);
}

const password = process.argv[2];
const url =
    `mongodb+srv://fullstack:${password}@cluster0.filyp.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const contactSchema = new mongoose.Schema({
    name: String,
    phoneNumber: String
})

const Contact = mongoose.model('Contact', contactSchema);

if (process.argv.length === 3) {
    Contact.find({}).then(resulst => {
        console.log('phonebook:\n');
        resulst.forEach(element => {
            console.log(element.name + ' ' + element.phoneNumber)
        })
        mongoose.connection.close();
    })
} else {
    const _name = process.argv[3];
    const _phoneNumber = process.argv[4];
    
    const contact = new Contact({
        name: _name,
        phoneNumber: _phoneNumber
    });
    
    contact.save().then(response => {
        console.log(`added ${_name} with number ${_phoneNumber} to phonebook`);
        mongoose.connection.close()
    })
}

