const { ApolloServer, UserInputError, gql } = require('apollo-server');
const { v1: uuid } = require('uuid');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Author = require('./models/Author');
const Book = require('./models/Book');

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

let authors = [
    {
      name: 'Robert Martin',
      id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
      born: 1952,
    },
    {
      name: 'Martin Fowler',
      id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
      born: 1963
    },
    {
      name: 'Fyodor Dostoevsky',
      id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
      born: 1821
    },
    { 
      name: 'Joshua Kerievsky', // birthyear not known
      id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
    },
    { 
      name: 'Sandi Metz', // birthyear not known
      id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
    },
  ]
  
  let books = [
    {
      title: 'Clean Code',
      published: 2008,
      author: 'Robert Martin',
      id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
      genres: ['refactoring']
    },
    {
      title: 'Agile software development',
      published: 2002,
      author: 'Robert Martin',
      id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
      genres: ['agile', 'patterns', 'design']
    },
    {
      title: 'Refactoring, edition 2',
      published: 2018,
      author: 'Martin Fowler',
      id: "afa5de00-344d-11e9-a414-719c6709cf3e",
      genres: ['refactoring']
    },
    {
      title: 'Refactoring to patterns',
      published: 2008,
      author: 'Joshua Kerievsky',
      id: "afa5de01-344d-11e9-a414-719c6709cf3e",
      genres: ['refactoring', 'patterns']
    },  
    {
      title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
      published: 2012,
      author: 'Sandi Metz',
      id: "afa5de02-344d-11e9-a414-719c6709cf3e",
      genres: ['refactoring', 'design']
    },
    {
      title: 'Crime and punishment',
      published: 1866,
      author: 'Fyodor Dostoevsky',
      id: "afa5de03-344d-11e9-a414-719c6709cf3e",
      genres: ['classic', 'crime']
    },
    {
      title: 'The Demon ',
      published: 1872,
      author: 'Fyodor Dostoevsky',
      id: "afa5de04-344d-11e9-a414-719c6709cf3e",
      genres: ['classic', 'revolution']
    },
  ]
  
  const typeDefs = gql`
    type Query {
        bookCount: Int!
        authorCount: Int!
        getAllBooks(name: String, genre: String): [Book!]!
        getAllAuthors: [Author!]!
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
    }

    type Book {
        title: String!
        published: Int!
        author: String!
        id: ID!
        genres: [String!]
    }

    type Author {
        name: String!
        id: ID!
        bookCount: Int
        born: Int
    }

  `
  
  const resolvers = {
    Query: {
        bookCount: () => books.length,
        authorCount: () => authors.length,
        getAllBooks: (root, args) => {
            if (args.name && args.genre) {
              return books.filter(b => (b.author === args.name && b.genres.find(g => g === args.genre)));
            } else if (args.name && !args.genre) {
              return books.filter(b => b.author === args.name)
            } else if (args.genre && !args.name) {
              return books.filter(b => b.genres.find(g => g === args.genre))
            } else 
              return books
        },
        getAllAuthors: () => authors
    },
    Author: {
        name: (root) => root.name,
        id: (root) => root.id,
        born: (root) => root.born,
        bookCount: (root) => {
            const amountOfBooks = books.filter(b => b.author === root.name)
            return amountOfBooks.length;
        }
    },
    Mutation: {
      addBook: (root, args) => {
        if (!authors.find(a => a.name === args.author)) {
          const newAuthor = {name: args.author, id: uuid()};
          authors = authors.concat(newAuthor);
        }
        if (books.find(b => b.title === args.title)) {
          throw new UserInputError('Title already exists', {
            invalidArgs: args.title,
          })
        }
        const newBook = {...args, id: uuid()};
        books = books.concat(newBook);
        return newBook;
      },
      editAuthor: (root, args) => {
        const author = authors.find(a => a.name === args.name)
        if (!author) {
          throw new UserInputError('Author doesn\'t exist', {
            invalidArgs: args.name
          });
        };
        const updatedAuthor = { ...author, born: args.setBornTo};
        authors = authors.map(a => a.name === args.name ? updatedAuthor : a);
        return updatedAuthor;
      }
    }
  }
  
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  })
  
  server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
  })
