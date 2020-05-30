// reducer
const notificationReducer = (state=null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    default:
      return state
  }
}

// action creator
export const setNotification = (message, time) => {
  return dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification: message
    })
    setTimeout(() => {
      dispatch(removeNotification())
    }, time)
  }
}

export const removeNotification = () => {
  return {
    type: 'SET_NOTIFICATION',
    notification: null
  }
}

export default notificationReducer