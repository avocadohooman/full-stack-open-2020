import React from 'react';
import { useDispatch } from 'react-redux'
import { createNew } from '../reducers/anecdoteReducer';
import anectodeService from '../services/anectodeService';

const AnectodeForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (e) => {
        e.preventDefault();
        const newContent = e.target.anecdote.value;
        e.target.anecdote.value = "";
        dispatch(createNew(newContent));
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
            <div>
                <input 
                    name="anecdote"
                />
            </div>
            <button type="submit">create</button>
            </form>
        </div>
    )
};

export default AnectodeForm;
