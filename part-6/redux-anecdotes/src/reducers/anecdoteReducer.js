import { ACTIONS } from "../App";
import anectodeService from "../services/anectodeService";

export const voteOf = (id) => {
  return {
    type: ACTIONS.VOTE,
    data: { id },
  }
}

export const createNew = data => {
  return async dispatch => {
    const newData = await anectodeService.createNew(data);
    dispatch({
      type: ACTIONS.CREATE,
      data: newData,
    })
  }
}

export const initiateAnectodes = () => {
  return async dispatch => {
    const allData = await anectodeService.getAll()
    dispatch ({
      type: ACTIONS.INIATE,
      data: allData,
    })
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