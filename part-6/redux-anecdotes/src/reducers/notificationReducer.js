import { ACTIONS } from "../App";

export const clearNotification = () => {
    return {
        type: ACTIONS.SET_NOTIFICATION,
        data: ""
    }
}

let timer;
export const setNotification = (notification, time) => {
    return async dispatch => {
        dispatch({
            type: ACTIONS.SET_NOTIFICATION,
            data: `you voted for '${notification}'`
        })
        clearTimeout(timer);
        timer = setTimeout(() => dispatch({
            type: ACTIONS.SET_NOTIFICATION,
            data: ``
        }), time * 1000);
    }
}

const notificationReducer = (notification = "", action) => {
    console.log('state now: ', notification)
    console.log('action', action)  
    switch (action.type) {
        case ACTIONS.SET_NOTIFICATION:
            return action.data;
        default:
            return notification;
    }
}

export default notificationReducer;