import React from 'react'
import AnectodeForm from './components/AnecdoteForm';
import AnectodeList from './components/AnectodeList';

export const ACTIONS = {
  VOTE: 'vote',
  CREATE: 'create'
}

const App = () => {

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnectodeList />
      <AnectodeForm />
    </div>
  )
}

export default App;