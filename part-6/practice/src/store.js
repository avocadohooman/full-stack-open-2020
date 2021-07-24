import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import noteReducer from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'

export const ACTIONS = {
    NEW_NOTE: 'newNote',
    INIT_NOTE: 'initialiseNotes',
    TOGGLE: 'updateNote',
    SET_FILTER: 'setFilter',
}

const reducer = combineReducers({
    notes: noteReducer,
    filter: filterReducer,
  })

const store = createStore(
    reducer,
    composeWithDevTools(
      applyMiddleware(thunk)
    )
)
  
export default store