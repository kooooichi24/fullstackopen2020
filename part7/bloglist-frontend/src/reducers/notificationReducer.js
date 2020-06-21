// reducer
const notificationReducer = (state=null, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.data
        case 'CLEAR_NOTIFICATION':
            return null
        default:
            return state
    }
}

let timeoutId

// action creator
export const setNotification = (message, type='success') => {
    return async dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            data: {
                message,
                type
            }
        })

        if (timeoutId) {
            clearTimeout(timeoutId)
        }

        timeoutId = setTimeout(() => {
            dispatch(removeNotification())
        }, 5000)
    }
}

export const removeNotification = () => {
    return {
        type: 'CLEAR_NOTIFICATION'
    }
}

export default notificationReducer