require('dotenv').config()
const { request, response } = require('express');
const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors')
const Contact = require('./models/contacts');
const { nextTick } = require('process');

app.use(cors())
app.use(express.static('build'))

morgan.token('json', (req, res) => {
    return JSON.stringify(req.body)
})

morgan.token('custom', (token, req, res) => {
    return (
        [
            token.method(req, res),
            token.url(req, res),
            token.status(req, res),
            token.res(req, res, 'content-length'), '-',
            token['response-time'](req, res), 'ms',
            token['json'](req, res)
        ].join(' ')
    )
})

app.use(morgan('custom'));

app.use(express.json());

const errorHandler = (error, request, response, next) => {
    console.log('Error message: ', error.message);

    if (error.name === 'CastError') {
        return response.status(400).send({error: error.message})
    }
    next(error);
}

app.use(errorHandler);

app.post('/api/persons', (request, response, next) => {
    const body = request.body;
    console.log('POST body', body);

    if (!body.name || !body.phoneNumber) {
        return response.status(400).json({
            error: 'name and phone numbers are missing'
        })
    }
    const person = new Contact({
        name: body.name,
        phoneNumber: body.phoneNumber
    })
    console.log('POST Person', person);

    person.save()
        .then(savedContact => {
        response.json(savedContact);
    })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body;

    const person = {
        name: body.name,
        phoneNumber: body.phoneNumber
    }

    Contact.findByIdAndUpdate(request.params.id, person, {new: true})
        .then(updatedContact => {
        response.json(updatedContact)
    })
        .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
    console.log('GET NOTE BY ID', request.params.id);
    Contact.findById(request.params.id)
        .then(contact => {
            if (contact) {
                response.json(contact);
                response.status(204).end();
            } else {
                response.status(404).end();
            }
        })
        .catch(error => next(error))
})

app.get('/api/persons', (request, response, next) => {
    Contact.find({})
        .then(contact => {
            response.json(contact);
    })
        .catch(error => next(error))
})

app.get('/info', (request, response) => {
    Contact.countDocuments({})
        .then(entries => {
            console.log(entries);
            const amountOfContact = entries;
            const contacts = `Phonebook has info for ${amountOfContact} people`;
            const date = Date();
        
            const message = contacts + '<br><br>' + date;
        
            response.send(message);
    })
})

app.delete('/api/persons/:id', (request, response, next) => {
    console.log('GET NOTE BY ID', request.params.id);
    // persons = persons.filter(person => person.id !== id);
    Contact.findByIdAndRemove(request.params.id)
        .then(contact => {
            if (contact) {
                response.json(contact);
                response.status(204).end();
            } else {
                response.status(404).end();
            }
        })
        .catch(error => next(error))
})

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

