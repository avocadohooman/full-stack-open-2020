import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import noteReducer from './reducers/noteReducer'

export const ACTIONS = {
    NEW_NOTE: 'newNote',
    UPDATE_NOTE: 'updateNote',
}

const store = createStore(noteReducer);

store.dispatch({
    type: ACTIONS.NEW_NOTE,
    data: {
        content: 'the app state is in redux store',
        important: true,
        id: 1,
    }
});

store.dispatch({
    type: ACTIONS.NEW_NOTE,
    data: {
        content: 'state changes are made with actions',
        important: false,
        id: 2,
    }
});

store.dispatch({
    type: ACTIONS.UPDATE_NOTE,
    data: {
        id: 2
    }
})

const App = () => {

    return (
        <div>
            <ul>
                {store.getState().map((note,i) => 
                    <li key={i}>
                        {note.content} <strong>{note.important ? 'important' : ''}</strong>
                    </li>)}
            </ul>
        </div>
    )
}

const renderApp = () => {
    ReactDOM.render(<App />, document.getElementById('root'))
}
  
renderApp()
store.subscribe(renderApp)