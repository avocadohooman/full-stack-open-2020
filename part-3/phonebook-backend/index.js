const { request, response } = require('express');
const express = require('express');
const morgan = require('morgan');
const app = express();

let persons = [
    {
        id: 1,
        name: 'Gerhard Molin',
        phoneNumber: '+358 45 220 3414'
    },
    {
        id: 2,
        name: 'Eric Schmidt',
        phoneNumber: '+1 45 220 3414'
    },
    {
        id: 3,
        name: 'Lerry Page',
        phoneNumber: '+1 46 221 3414'
    },
    {
        id: 4,
        name: 'Steve Jobs',
        phoneNumber: '+1 42 100 3214'
    }
]

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

const generateId = (name) => {
    const randomId = name.length + Math.round(Math.random());
    return randomId;
}

app.post('/api/persons', (request, response) => {
    const body = request.body;
    console.log('POST body', body);

    if (!body.name || !body.phoneNumber) {
        return response.status(400).json({
            error: 'name and phone numbers are missing'
        })
    }

    if (persons.find(person => body.name === person.name)) {
        return response.status(400).json({
            error: 'name already exists in the database'
        })
    }

    const person = {
        id: generateId(request.body.name),
        name: body.name,
        phoneNumber: body.phoneNumber
    }

    console.log('POST Person', person);
    persons = persons.concat(person);
    response.send(person);
    // response.json(person);
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    console.log('ID', id);

    const person = persons.find(person => id === person.id);
    if (person)
        response.json(person);
    else 
        response.status(404).send('<h1>Error 404: Person not found</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons);
})

app.get('/info', (request, response) => {
    const contacts = `Phonebook has info for ${persons.length} people`;
    const date = Date();

    const message = contacts + '<br><br>' + date;

    response.send(message);
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter(person => person.id !== id);

    response.status(204).end();
})

const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

