import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'

const counterReducer = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1
        case 'DECREMENT':
            return state - 1
        case 'ZERO':
            return 0
        default:
            return state
    }
}

const store = createStore(counterReducer)

store.subscribe(() => {
    const storeNow = store.getState()
    console.log(storeNow)
})
store.dispatch({type: 'INCREMENT'})
store.dispatch({type: 'INCREMENT'})
store.dispatch({type: 'INCREMENT'})
store.dispatch({type: 'ZERO'})
store.dispatch({type: 'DECREMENT'})

const App = () => {

    return (
        <div>
            <div>
                {store.getState()}
            </div>
            <button onClick={e => store.dispatch({type:'INCREMENT'})}>+1</button>
            <button onClick={e => store.dispatch({type:'DECREMENT'})}>-1</button>
            <button onClick={e => store.dispatch({type:'ZERO'})}>0</button>

        </div>
    )
}

export default App;
