import { ACTIONS } from "../App";

export const voteOf = (id) => {
  return {
    type: ACTIONS.VOTE,
    data: { id },
  }
}

export const createNew = (data) => {
  return {
    type: ACTIONS.CREATE,
    data,
  }
}

export const initiateAnectodes = (anecdotes) => {
  return {
    type: ACTIONS.INIATE,
    data: anecdotes,
  }
}

const anectodeReducer = (anecdotes = [], action) => {
  console.log('state now: ', anecdotes)
  console.log('action', action)
  switch (action.type) {
    case ACTIONS.INIATE:
      return action.data;
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