import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import counterReducer from './reducer'

export const ACTIONS = {
  GOOD: 'good',
  OK: 'ok',
  BAD: 'bad',
  ZERO: 'zero',
  DO_NOTHING: 'doNothing'
}

const store = createStore(counterReducer);

const App = () => {

  const good = () => {
    store.dispatch({
      type: ACTIONS.GOOD,
    });
  };

  const ok = () => {
    store.dispatch({
      type: ACTIONS.OK,
    });
  };


  const bad = () => {
    store.dispatch({
      type: ACTIONS.BAD,
    });
  };

  const reset = () => {
    store.dispatch({
      type: ACTIONS.ZERO,
    });
  };

  return (
    <div>
      <button onClick={good}>good</button> 
      <button onClick={ok}>neutral</button> 
      <button onClick={bad}>bad</button>
      <button onClick={reset}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)