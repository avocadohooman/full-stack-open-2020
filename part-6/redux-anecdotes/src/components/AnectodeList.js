import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { voteOf } from '../reducers/anecdoteReducer';
import { setNotification, clearNotification } from '../reducers/notificationReducer';

const Anectode = ({anecdote, voteOf, setNotification, clearNotification}) => {
    return (
        <div>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes} vote(s)
                <button onClick={function() {
                    setNotification(anecdote.content, 5);
                    voteOf(anecdote.id); 
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
                        setNotification={() => dispatch(setNotification(anecdote.content, 5))}
                        clearNotification={() => dispatch(clearNotification())}
                    />
            )}
        </div>
    )
};

export default AnectodeList;
