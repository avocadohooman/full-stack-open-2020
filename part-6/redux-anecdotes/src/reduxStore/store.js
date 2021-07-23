import { createStore, combineReducers } from 'redux'
import anectodeReducer from '../reducers/anecdoteReducer'
import notificationReducer from '../reducers/notificationReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
    anectodes: anectodeReducer,
    notification: notificationReducer
})

const store = createStore(
    reducer,
    composeWithDevTools()
);

export default store;