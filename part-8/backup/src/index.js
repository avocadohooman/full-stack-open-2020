import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { 
    ApolloClient, 
    ApolloProvider, 
    HttpLink, 
    InMemoryCache
} from '@apollo/client';

const backendUri = 'http://localhost:4000';

const client = new ApolloClient({
    cache: new InMemoryCache,
    link: new HttpLink({
        uri: `${backendUri}`
    })
})


ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
    , document.getElementById('root')
)