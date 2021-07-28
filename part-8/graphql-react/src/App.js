
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useQuery } from '@apollo/client';
import { ALL_AUTHORS, ALL_BOOKS } from './queries/queries';

const App = () => {
  const [page, setPage] = useState('authors')
  const allAuthors = useQuery(ALL_AUTHORS);
  const allBooks = useQuery(ALL_BOOKS);
  
  if (allAuthors.loading || allBooks.loading) {
    return <div>...loading</div>
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

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

    </div>
  )
}

export default App