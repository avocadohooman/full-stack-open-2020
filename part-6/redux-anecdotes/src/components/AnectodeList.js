import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { voteOf } from '../reducers/anecdoteReducer';
import { createNotification, clearNotification } from '../reducers/notificationReducer';


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

    return (
        <div>
            {anecdotes
                .sort((function(a, b) {
                if (a.votes === b.votes) {
                    return 1;
                }
                return a.votes < b.votes ? 1 : -1; 
                }))
                .map(anecdote =>
                    <Anectode 
                        key={anecdote.id}
                        anecdote={anecdote}
                        voteOf={() => dispatch(voteOf(anecdote.id))}
                        createNotification={() => dispatch(createNotification(anecdote.content))}
                        clearNotification={() => dispatch(clearNotification())}
                    />
            )}
        </div>
    )
};

export default AnectodeList;
