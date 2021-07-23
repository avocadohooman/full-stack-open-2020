import { ACTIONS } from "../App";

export const clearNotification = () => {
    return {
        type: ACTIONS.SET_NOTIFICATION,
        data: ""
    }
}

export const createNotification = (notification) => {
    return {
        type: ACTIONS.SET_NOTIFICATION,
        data: `you voted for '${notification}'`
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