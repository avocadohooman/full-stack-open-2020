const { ApolloServer, UserInputError, gql } = require('apollo-server');
const { v1: uuid } = require('uuid');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Authors = require('./models/Authors');
const Books = require('./models/Books');
const User = require('./models/User');

require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;
console.log('connecting to: ', MONGODB_URI);

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
});

const JWT_SECRET = process.env.SECRET
  
const typeDefs = gql`
  type Query {
      bookCount: Int!
      authorCount: Int!
      getAllBooks(name: String, genre: String): [Book!]!
      getAllAuthors: [Author!]!
      me: User
  }

  type Mutation {
    addBook (
      title: String!,
      author: String!
      published: Int!,
      genres: [String!]!
    ): Book
    editAuthor (
      name: String!, 
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
  
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
      title: String!
      published: Int!
      author: Author!
      genres: [String!]
      id: ID!
  }

  type Author {
      name: String
      id: ID!
      bookCount: Int
      born: Int
  }

  `

const resolvers = {
  Query: {
      bookCount: () => Books.collection.countDocuments(),
      authorCount: () => Authors.collection.countDocuments(),
      getAllBooks: async (root, args) => {
          let books = await Books.find().populate("author");
          console.log('Books', books);
          if (args.name && args.genre) {
            const author = await Authors.findOne({name: args.name});
            books = await Books.find()
              .where({
                author: author ? author._id : null,
                genres: { $in: [args.genre]},
              })
              .populate("author");
            return books;
          } 
          else if (args.name && !args.genre) {
            const author = await Authors.findOne({name: args.name});
            books = await Books.find()
            .where({
              author: author ? author._id : null,
            })
            .populate("author");
            return books;
          } else if (args.genre && !args.name) {
            books = await Books.find()
            .where({
              genres: { $in: [args.genre]},
            })
            .populate("author");
            return books;
          }   
          return books;
      },
      getAllAuthors: () => Authors.find({})
  },
  Author: {
      name: (root) => root.name,
      id: (root) => root.id,
      born: (root) => root.born,
      bookCount: async (root) => {
          const amountOfBooks = await Books.find()
          .where({
            author: root.id
          });
          return amountOfBooks.length;
      }
  },
  Mutation: {
    createUser: async (root, args) => {
      const user = new User({username: args.username});
      console.log('user', user);
      try {
        await user.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return user;
    },
    login: async (root, args) => {
      const user = await User.findOne({username: args.username});
      console.log("User", user);
      if (!user || args.password !== 'secret') {
        throw new UserInputError("wrong credentials");
      }
      const tokenForUser = {
        username: user.username,
        id: user._id
      }
      return { value: jwt.sign(tokenForUser, JWT_SECRET)};
    },
    addBook: async (root, args, { currentUser }) => {
      console.log('currentuser', currentUser);
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      } 
      try {
        if (await Books.findOne({title: args.title})) {
          throw new UserInputError('Title already exists', {
            invalidArgs: args.title,
          })
        }
        let author = await Authors.findOne({name: args.author})
        if (!author) {
          author = new Authors({ name: args.author })
          await author.save();
        }
        const newBook = new Books({...args, author: author._id});
        await newBook.save();
        console.log('newBook', newBook);
        return newBook;
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      } 
      const author = await Authors.findOne({name: args.name});
      if (!author) {
        throw new UserInputError('Author doesn\'t exist', {
          invalidArgs: args.name
        });
      };
      author.born = args.setBornTo;
      try {
        await author.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      } 
      return author;
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({req}) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLocaleLowerCase('bearer')) {
      const decodedToken = jwt.verify(auth.substr(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return {currentUser};  
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
