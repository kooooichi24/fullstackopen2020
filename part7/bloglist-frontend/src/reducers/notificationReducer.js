// reducer
const notificationReducer = (state=null, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            console.log('set')
            return action.data
        case 'CLEAR_NOTIFICATION':
            console.log('cls')
            return null
        default:
            console.log('default')
            return state
    }
}

let timeoutId

// action creator
export const setNotification = (message, type) => {
    return dispatch => {
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