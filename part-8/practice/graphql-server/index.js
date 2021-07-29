const { ApolloServer, UserInputError, gql } = require('apollo-server');
const { v1: uuid } = require('uuid')
const Person = require('./models/person');
const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;
console.log('connecting to: ', MONGODB_URI);

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

let persons = [
    {
        name: "Arto Hellas",
        phone: "040-123543",
        street: "Tapiolankatu 5 A",
        city: "Espoo",
        id: "3d594650-3436-11e9-bc57-8b80ba54c431"
      },
      {
        name: "Matti Luukkainen",
        phone: "040-432342",
        street: "Malminkaari 10 A",
        city: "Helsinki",
        id: '3d599470-3436-11e9-bc57-8b80ba54c431'
      },
      {
        name: "Venla Ruuska",
        street: "Nallemäentie 22 C",
        city: "Helsinki",
        id: '3d599471-3436-11e9-bc57-8b80ba54c431'
      },
];


const typeDefs = gql
`
    type Address {
        street: String!
        city: String!
    }

    type Person {
        name: String!
        phone: String!
        address: Address!
        id: ID!
    }

    enum YesNo {
        YES
        NO
    }

    type Query {
        personCount: Int!
        allPersons(phone: YesNo): [Person!]!
        findPerson(name: String!): Person
    }

    type Mutation {
        addPerson(
            name: String!
            phone: String
            street: String!
            city: String!
        ): Person
        editNumber(
            name: String!
            phone: String!
        ): Person
    }
`

const resolvers = {
    Query: {
        personCount: () => Person.collection.countDocuments(),
        allPersons: (root, args) => {
            if (!args.phone) {
                return Person.find({});
            }
            return Person.find({ phone: { $exists: args.phone === 'YES'  }})
        },
        findPerson: (root, args) => 
            Person.findOne({ name: args.name })
    },
    Person: {
        name: (root) => root.name,
        phone: (root) => root.phone,
        address: (root) => {
            return {
                street: root.street,
                city: root.city
            }
        },
        id: (root) => root.id
    },
    Mutation: {
        addPerson: async (root, args) => {
            if (await Person.findOne({ name: args.name })) {
                throw new UserInputError('Name must be unique', {
                  invalidArgs: args.name,
                })
            }
            const person = new Person({ ...args})
            try {
                person.save();
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                  })
            }
            return person;
        },
        editNumber: async (root, args) => {
            const person = await Person.findOne({ name: args.name });
            if (!person) {
                return null;
            }
            person.phone = args.phone;
            try {
                person.save();
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }
            return person
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
});


server.listen().then(({ url }) => {
    console.log(`Server is running on ${url}`);
});


