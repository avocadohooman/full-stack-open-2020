const { ApolloServer, UserInputError, gql } = require('apollo-server');
const { v1: uuid } = require('uuid');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Authors = require('./models/Authors');
const Books = require('./models/Books');

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
      author: Author!
      genres: [String!]
      id: ID!
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
      bookCount: () => Books.collection.countDocuments(),
      authorCount: () => Authors.collection.countDocuments(),
      getAllBooks: async (root, args) => {
          let books = await Books.find({});
          if (args.name && args.genre) {
            const author = await Authors.findOne({name: args.name});
            books = await Books.find()
              .where({
                author: author ? author._id : null,
                genres: { $in: [args.genre]},
              });
            console.log('Books', books);
            return books;
          } 
          else if (args.name && !args.genre) {
            const author = await Authors.findOne({name: args.name});
            books = await Books.find()
            .where({
              author: author ? author._id : null,
            });
            console.log('Books', books);
            return books;
          } else if (args.genre && !args.name) {
            books = await Books.find()
            .where({
              genres: { $in: [args.genre]},
            });
            console.log('Books', books);
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
      bookCount: (root) => {
          const amountOfBooks = books.filter(b => b.author === root.name)
          return amountOfBooks.length;
      }
  },
  Mutation: {
    addBook: async (root, args) => {
      try {
        if (await Books.findOne({title: args.title})) {
          throw new UserInputError('Title already exists', {
            invalidArgs: args.title,
          })
        }
        let author = await Authors.findOne({name: args.author})
        if (!author) {
          console.log('Args name', args.author);
          author = new Authors({ name: args.author })
          console.log('Authors', author);
          await author.save();
        }
        console.log('Author', author._id);
        const newBook = new Books({...args, author: author._id});
        console.log('New Book', newBook);
        await newBook.save();
        return newBook;
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    editAuthor: async (root, args) => {
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
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
