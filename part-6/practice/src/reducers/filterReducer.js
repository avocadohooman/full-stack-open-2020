import { ACTIONS } from '../store';

export const filterChange = filter => {
    return {
      type: ACTIONS.SET_FILTER,
      filter,
    }
  }
  
const filterReducer = (state = 'ALL', action) => {
    switch (action.type) {
      case ACTIONS.SET_FILTER:
        return action.filter;
      default:
        return state;
    }
}

export default filterReducer;