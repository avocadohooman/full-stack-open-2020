import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteOf, createNew } from './reducers/anecdoteReducer';

export const ACTIONS = {
  VOTE: 'vote',
  CREATE: 'create'
}

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const addAnecdote = (e) => {
    e.preventDefault();
    const newContent = e.target.anecdote.value;
    e.target.anecdote.value = "";
    dispatch(createNew(newContent));
  }

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
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
            <input 
            name="anecdote"
            />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App