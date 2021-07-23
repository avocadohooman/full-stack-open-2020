import React from 'react'
import AnectodeForm from './components/AnecdoteForm';
import AnectodeList from './components/AnectodeList';
import Notification from './components/Notification';

export const ACTIONS = {
  VOTE: 'vote',
  CREATE: 'create',
  SET_NOTIFICATION: 'setNotification'
}

const App = () => {

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnectodeList />
      <AnectodeForm />
    </div>
  )
}

export default App;