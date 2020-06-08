// reducer
const userReducer = (state=null, action) => {
    switch (action.type) {
        case 'LOGIN':
            return action.payload
        case 'LOGOUT':
            return null
        default:
            return state
    }
}

// action creator
export const login = (user) => {
    return async dispatch => {
        dispatch({
            type: 'LOGIN',
            payload: user
        })
    }
}

export const logout = () => {
    return async dispatch => {
        dispatch({
            type: 'LOGOUT',
        })
    }
}

export default userReducer