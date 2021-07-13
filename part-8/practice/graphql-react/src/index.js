import React from 'react';
import ReactDom from 'react-dom';
import App from './App';

import { 
  ApolloClient, 
  ApolloProvider, 
  HttpLink, 
  InMemoryCache, 
  gql } from '@apollo/client'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:4000',
  })
})

const query = gql`
query {
  allPersons(phone: YES)  {
    name,
    address {
      street,
      city
    }
    phone
    id
  }
}
`

client.query({ query })
  .then((response) => {
    console.log(response.data)
})

ReactDom.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  , document.getElementById('root')
);