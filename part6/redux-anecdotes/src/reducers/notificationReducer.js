// reducer
const notificationReducer = (state=null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.content
    case 'CLEAR_NOTIFICATION':
      return null
    default:
      return state
  }
}

let timeoutId

// action creator
export const setNotification = (content, time) => {
  return dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      content
    })

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      dispatch(removeNotification())
    }, time*1000)
  }
}

export const removeNotification = () => {
  return { type: 'CLEAR_NOTIFICATION' }
}

export default notificationReducer