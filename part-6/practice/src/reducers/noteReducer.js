import { ACTIONS } from '../store';
import noteService from '../services/notes'

export const createNote = content => {
  return async dispatch => {
    const newNote = await noteService.createNew(content)
    dispatch({
      type: ACTIONS.NEW_NOTE,
      data: newNote,
    })
  }
}

export const initialiseNotes = () => {
  return async dispatch => {
    const notes = await noteService.getAll()
    dispatch({
      type: ACTIONS.INIT_NOTE,
      data: notes,
    })
  }
}

export const toggleImportanceOf = (id) => {
    return {
        type: ACTIONS.TOGGLE,
        data: { id }
    }
}

const noteReducer = (notes = [], action) => {
    switch (action.type) {
        case ACTIONS.NEW_NOTE:
            return [...notes, action.data];
        case ACTIONS.TOGGLE:
            const id = action.data.id;
            const noteToChange = notes.find(note => note.id === id);
            const changedNote = {...noteToChange, important: !noteToChange.important};
            return notes.map(note =>
                note.id !== id ? note : changedNote 
              )
        case ACTIONS.INIT_NOTE:
              return action.data;
        default:
            return notes;
    }
}

export default noteReducer;