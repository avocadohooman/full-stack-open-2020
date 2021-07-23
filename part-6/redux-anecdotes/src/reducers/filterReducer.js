import { ACTIONS } from "../App";

export const setFilter = (filter) => {
    return {
        type: ACTIONS.SET_FILTER,
        data: filter
    }
}

const filterReducer = (filteredAnectodes = "", action) => {
    switch (action.type) {
        case ACTIONS.SET_FILTER:
            return action.data
        default:
            return filteredAnectodes;
    }
}

export default filterReducer;