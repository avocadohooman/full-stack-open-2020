import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import noteReducer from './reducers/noteReducer'
import App from './component/App'

export const ACTIONS = {
    NEW_NOTE: 'newNote',
    TOGGLE: 'updateNote',
}

const store = createStore(noteReducer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
)