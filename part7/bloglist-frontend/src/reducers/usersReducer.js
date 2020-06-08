import usersService from '../services/users'

// reducer
const usersReducer = (state=[], action) => {
    switch (action.type) {
        case 'INIT_USERS':
            return action.data
        default:
            return state
    }
}

// action creator
export const initializeUsers = () => {
    return async dispatch => {
        const data = await usersService.getAll()
        
        dispatch({
            type: 'INIT_USERS',
            data
        })
    }
}

export default usersReducer