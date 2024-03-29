import { ACTIONS } from './index';

const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case ACTIONS.GOOD:
      return {
        ...state,
        good: state.good + 1,
      }
    case ACTIONS.OK:
      return {
        ...state,
        ok: state.ok + 1,
      }
    case ACTIONS.BAD:
      return {
        ...state,
        bad: state.bad + 1,
      }
    case ACTIONS.ZERO:
      const resetState = {good: 0, ok: 0, bad: 0};
      return resetState;
    default: return state
  }
  
}

export default counterReducer;