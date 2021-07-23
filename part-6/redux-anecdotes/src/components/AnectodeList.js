import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { voteOf } from '../reducers/anecdoteReducer';


const Anectode = ({anecdote, voteOf}) => {
    return (
        <div>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => voteOf(anecdote.id)}>vote(s)</button>
            </div>
        </div>
    )
}
const AnectodeList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state);

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
                    />
            )}
        </div>
    )
};

export default AnectodeList;
