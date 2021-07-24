import React, { useEffect } from 'react';
import NewNote from './NewNote';
import Notes from './Notes';
import VisibilityFilter from './VisibilityFilter';
import { initialiseNotes } from '../reducers/noteReducer';
import { useDispatch } from 'react-redux';


const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initialiseNotes()) 
    },[dispatch]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <NewNote />
            <VisibilityFilter />
            <Notes />
      </div>
    )
}

export default App;