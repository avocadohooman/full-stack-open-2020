import { gql  } from '@apollo/client';

export const ALL_AUTHORS = gql `
    query{
        getAllAuthors {
            name,
            bookCount,
            born
            id
        }
    }
`

export const ALL_BOOKS = gql `
    query {
      getAllBooks {
        title
        published
        genres
        id
        author {
          name
          bookCount
          born
        }
      }
    }
`

export const ADD_BOOK = gql `
mutation Mutation($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      title
      published
      author {
        name
      }
      genres
      id
    }
  }
`


export const EDIT_AUTHOR = gql `
mutation Mutation($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) {
      name
      id
      bookCount
      born
    }
  }
`
export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`