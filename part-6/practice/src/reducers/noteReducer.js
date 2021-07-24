import { ACTIONS } from '../index';

export const createNote = (data) => {
    return {
      type: ACTIONS.NEW_NOTE,
      data,
    }
}

export const initialiseNotes = (notes) => {
  return {
    type: ACTIONS.INIT_NOTE,
    data: notes,
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