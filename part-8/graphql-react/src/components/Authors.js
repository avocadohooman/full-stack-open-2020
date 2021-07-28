  
import React, { useState } from 'react'
import { useMutation } from '@apollo/client';
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries/queries';

const Authors = ( { allAuthors }) => {

  const [name, setName] = useState('');
  const [born, setYear] = useState('')

  const [changeBirthDate, result] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{query: ALL_AUTHORS}],
    onError: (error) => {
      console.log('error message', error);
    }
  })

  if (!allAuthors) {
    return null
  }

  const submit = (event) => {
    event.preventDefault();
    changeBirthDate({ variables: {name, born} });
    setName('');
    setYear('');
  }
  const authors = allAuthors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        <h2>Set birthyear</h2>
        <form onSubmit={submit}>
          <div>
            name <input value={name}
              onChange={({ target }) => setName(target.value)}
            />
          </div>
          <div>
            date of birth <input value={born}
              onChange={({ target }) => setYear(Number(target.value))}
            />
          </div>
          <button type='submit'>set date of birth</button>
        </form>
      </div>
    </div>
  )
}

export default Authors
