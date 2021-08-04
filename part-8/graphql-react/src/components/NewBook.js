import React, { useState } from 'react'
import {  useMutation } from '@apollo/client';
import { ADD_BOOK, ALL_BOOKS, ALL_AUTHORS } from '../queries/queries';

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const [published, setPublished] = useState(2021)
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [createBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{query: ALL_AUTHORS}],
    onError: (error) => {
      console.log('Error: ', error.graphQLErrors[0].message);
    },
    update: (store, response) => {
      let dataInStoreBooks = store.readQuery({query: ALL_BOOKS});
      console.log('data in store before update', dataInStoreBooks);
      console.log('response data', response.data.addBook);
      store.writeQuery({
        query: ALL_BOOKS,
        data: {
          ...dataInStoreBooks,
          getAllBooks: [...dataInStoreBooks.getAllBooks, response.data.addBook]
        }
      });
      dataInStoreBooks = store.readQuery({query: ALL_BOOKS});
      console.log('data in store after update', dataInStoreBooks);
    }
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    createBook({ variables: {title, author, published, genres }});
    console.log('add book...')

    setTitle('')
    setPublished(2021)
    setAuhtor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(Number(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook