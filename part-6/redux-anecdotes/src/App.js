import React, { useEffect } from 'react'
import AnectodeForm from './components/AnecdoteForm';
import AnectodeList from './components/AnectodeList';
import Notification from './components/Notification';
import Filter from './components/Filter';
import anectodeService from './services/anectodeService';
import { useDispatch } from 'react-redux'
import { initiateAnectodes } from './reducers/anecdoteReducer';

export const ACTIONS = {
  VOTE: 'vote',
  CREATE: 'create',
  INIATE: 'initiate',
  SET_NOTIFICATION: 'setNotification',
  SET_FILTER: 'setFilter'
}

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initiateAnectodes());
  }, []);

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