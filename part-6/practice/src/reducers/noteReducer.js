import { ACTIONS } from '../index';

const noteReducer = (notes = [], action) => {
    switch (action.type) {
        case ACTIONS.NEW_NOTE:
            return [...notes, action.data];
        case ACTIONS.UPDATE_NOTE:
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