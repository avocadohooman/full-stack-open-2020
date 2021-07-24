import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import noteReducer  from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'
import App from './component/App'
import { composeWithDevTools } from 'redux-devtools-extension'

export const ACTIONS = {
    NEW_NOTE: 'newNote',
    INIT_NOTE: 'initialiseNotes',
    TOGGLE: 'updateNote',
    SET_FILTER: 'setFilter',
}

const reducer = combineReducers({
    notes: noteReducer,
    filter: filterReducer
});

const store = createStore(
    reducer,
    composeWithDevTools()
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
)