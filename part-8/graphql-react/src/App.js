
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useQuery, useApolloClient } from '@apollo/client';
import { ALL_AUTHORS, ALL_BOOKS } from './queries/queries';
import LoginForm from './components/LoginForm';

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState('');
  const allAuthors = useQuery(ALL_AUTHORS);
  const allBooks = useQuery(ALL_BOOKS);
  const client = useApolloClient()

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }

  if (allAuthors.loading || allBooks.loading) {
    return <div>...loading</div>
  }

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        {!token && <button onClick={() => setPage('login')}>login</button>}
        {token && <button onClick={logout}>logout</button>}
      </div>

      {errorMessage !== null && 
                <Notify errorMessage={errorMessage} />
      }

      {page === 'authors' && 
        <Authors
            allAuthors={allAuthors.data.getAllAuthors}
        />
      }


      {page === 'books' && 
        <Books
          allBooks={allBooks.data.getAllBooks}
        />
      }

      {page === 'add' && 
        <NewBook
            show={page==='add'}
        />
      }

      {page === 'login' && !token &&
        <LoginForm 
          setError={notify}
          setToken={setToken}
        />
      }

    </div>
  )
}

const Notify = ({errorMessage}) => {
  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
    {errorMessage}
    </div>
  )
}

export default App