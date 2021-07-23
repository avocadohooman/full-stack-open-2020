import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteOf } from './reducers/anecdoteReducer';
import AnectodeForm from './components/AnecdoteForm';

export const ACTIONS = {
  VOTE: 'vote',
  CREATE: 'create'
}

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  return (
    <div>
      <h2>Anecdotes</h2>
        {anecdotes
            .sort((function(a, b) {
              if (a.votes === b.votes) {
                return 1;
              }
              return a.votes < b.votes ? 1 : -1; 
            }))
            .map(anecdote =>
                <div key={anecdote.id}>
                  <div>
                    {anecdote.content}
                  </div>
                  <div>
                    has {anecdote.votes}
                    <button onClick={() => dispatch(voteOf(anecdote.id))}>vote(s)</button>
                  </div>
                </div>
          )}
      <AnectodeForm />
    </div>
  )
}

export default App;