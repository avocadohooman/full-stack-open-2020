import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { voteOf, initiateAnectodes } from '../reducers/anecdoteReducer';
import { createNotification, clearNotification } from '../reducers/notificationReducer';
import anectodeService from '../services/anectodeService';

const Anectode = ({anecdote, voteOf, createNotification, clearNotification}) => {
    return (
        <div>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes} vote(s)
                <button onClick={function() {
                    createNotification(anecdote.content);
                    voteOf(anecdote.id);
                    setTimeout(() => {
                        clearNotification();
                    }, 5000); 
                }}>vote</button>
            </div>
        </div>
    )
}
const AnectodeList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anectodes);
    const filteredAnectodes = useSelector(state => state.filter);
    
    return (
        <div>
            {anecdotes
                .sort((function(a, b) {
                if (a.votes === b.votes) {
                    return 1;
                }
                return a.votes < b.votes ? 1 : -1; 
                }))
                .filter((data) => {
                    return data.content.toLowerCase().search(filteredAnectodes) !== -1;
                })
                .map(anecdote =>
                    <Anectode 
                        key={anecdote.id}
                        anecdote={anecdote}
                        voteOf={() => dispatch(voteOf(anecdote, anecdote.id))}
                        createNotification={() => dispatch(createNotification(anecdote.content))}
                        clearNotification={() => dispatch(clearNotification())}
                    />
            )}
        </div>
    )
};

export default AnectodeList;
