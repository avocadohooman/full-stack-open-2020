import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleImportanceOf } from '../reducers/noteReducer'


const Note = ({ note,  toggleImportance}) => {

    return (
        <li>
            {note.content} <strong>{note.important ? 'important' : ''}</strong>
            <button onClick={() => toggleImportance(note.id)}>Toggle Importance</button>
        </li>
    )
}

const Notes = () => {
    const notes = useSelector(state => state);
    const dispatch = useDispatch()

    return (
        <ul>
        {notes.map(note =>
            <Note 
                key={note.id}
                note = {note}
                toggleImportance = {() => dispatch(toggleImportanceOf(note.id))}
            />
        )}
      </ul>
    )
}

export default Notes;