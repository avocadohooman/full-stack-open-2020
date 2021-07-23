import { ACTIONS } from "../App";
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

export const voteOf = (id) => {

  return {
    type: ACTIONS.VOTE,
    data: { id },
  }
}

export const createNew = (newContent) => {
  return {
    type: ACTIONS.CREATE,
    data: {
      content: newContent,
      id: getId(),
      votes: 0
    }
  }
}

const anectodeReducer = (anecdotes = initialState, action) => {
  console.log('state now: ', anecdotes)
  console.log('action', action)
  switch (action.type) {
    case ACTIONS.VOTE:
      const id = action.data.id;
      const anecdoteToUpdate = anecdotes.find(a => a.id === id);
      const updatedAnectode = {...anecdoteToUpdate, votes: anecdoteToUpdate.votes + 1}; 
      return anecdotes.map(anecdote => 
        anecdote.id === id ? updatedAnectode : anecdote);
      case ACTIONS.CREATE:
        return [...anecdotes, action.data];
    default:
      return anecdotes;
  }
}

export default anectodeReducer;