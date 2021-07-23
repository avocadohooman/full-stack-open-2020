import React from 'react'
import AnectodeForm from './components/AnecdoteForm';
import AnectodeList from './components/AnectodeList';
import Notification from './components/Notification';
import Filter from './components/Filter';

export const ACTIONS = {
  VOTE: 'vote',
  CREATE: 'create',
  SET_NOTIFICATION: 'setNotification',
  SET_FILTER: 'setFilter'
}

const App = () => {

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification />
      <AnectodeList />
      <AnectodeForm />
    </div>
  )
}

export default App;