import { ACTIONS } from '../index';

const generateId = () => Math.floor(Math.random() * Math.PI * 10000);

export const createNote = (content) => {
    return {
      type: ACTIONS.NEW_NOTE,
      data: {
        content,
        important: false,
        id: generateId()
      }
    }
  }
  
export const toggleImportanceOf = (id) => {
    return {
        type: ACTIONS.TOGGLE,
        data: { id }
    }
}

const initialState = [
  {
    content: 'reducer defines how redux store works',
    important: true,
    id: 1,
  },
  {
    content: 'state of store can contain any data',
    important: false,
    id: 2,
  },
]

const noteReducer = (notes = initialState, action) => {
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
        default:
            return notes;
    }
}

export default noteReducer;