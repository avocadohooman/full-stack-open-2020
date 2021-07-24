import React, { useEffect } from 'react';
import NewNote from './NewNote';
import Notes from './Notes';
import VisibilityFilter from './VisibilityFilter';
import noteService from '../services/notes';
import { initialiseNotes } from '../reducers/noteReducer';
import { useDispatch } from 'react-redux';


const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        noteService
        .getAll()
        .then(notes => dispatch(initialiseNotes(notes)));
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <NewNote />
            <VisibilityFilter />
            <Notes />
      </div>
    )
}

export default App;