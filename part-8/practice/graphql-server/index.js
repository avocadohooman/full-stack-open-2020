const { ApolloServer, UserInputError, gql } = require('apollo-server');
const Person = require('./models/person');
const User = require('./models/User');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;
console.log('connecting to: ', MONGODB_URI);

const JWT_SECRET = process.env.SECRET

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
});

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

    type User {
        username: String!
        friends: [Person!]!
        id: ID!
    }

    type Token {
        value: String!
    }

    enum YesNo {
        YES
        NO
    }

    type Query {
        personCount: Int!
        allPersons(phone: YesNo): [Person!]!
        findPerson(name: String!): Person
        me: User
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
        createUser(
            username: String!
        ): User
        login(
            username: String!
            password: String!
        ): Token
        addAsFriend(
            name: String!
        ): User
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
        findPerson: (root, args) => {
            Person.findOne({ name: args.name })
        },
        me: (root, args, context) => {
            return context.currentUser;
        },
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
        addPerson: async (root, args, context) => {
            if (await Person.findOne({ name: args.name })) {
                throw new UserInputError('Name must be unique', {
                  invalidArgs: args.name,
                })
            }
            const person = new Person({ ...args})
            const currentUser = context.currentUser;
            if (!currentUser) {
                throw new AuthenticationError("not authenticated")
            }
            try {
                await person.save()
                currentUser.friends = currentUser.friends.concat(person);
                await currentUser.save()
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
                await person.save();
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }
            return person
        },
        createUser: async (root, args) => {
            const user = new User({username: args.username})
            try {
                await user.save();
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }
            return user;
        },
        addAsFriend: async (root, args, { currentUser }) => {
            const nonFriendAlready = (person) => 
                !currentUser.friends.map(f => f._id).includes(person._id);
            if (!currentUser) {
                    throw new AuthenticationError("not authenticated")
            }
            
            const person = await Person.findOne({ name: args.name });
            if (nonFriendAlready(person)) {
                currentUser.friends = currentUser.friends.concat(person);
            }
            await currentUser.save();
            return currentUser;
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username });
            console.log('args.password', user, args.password);
            if (!user || args.password !== 'secret') {
                throw new UserInputError("wrong credentials");
            }
            const userForToken = {
                username: user.username,
                id: user._id
            }
            return { value: jwt.sign(userForToken, JWT_SECRET)};
        },
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({req}) => {
        const auth = req ? req.headers.authorization : null;
        if (auth && auth.toLocaleLowerCase().startsWith('bearer')) {
            const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
            const currentUser = await User.findById(decodedToken.id).populate('friends');
            return { currentUser }
        }
        return null
    },
    introspection: true,
});


server.listen().then(({ url }) => {
    console.log(`Server is running on ${url}`);
});


