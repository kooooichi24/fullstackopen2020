import blogService from '../services/blogs'

// reducer
const blogReducer = (state=[], action) => {
    switch (action.type) {
        case 'INIT_BLOG':
            return action.data
        default:
            return state
    }
}

// action creator
export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()

        dispatch({
            type: 'INIT_BLOG',
            data: blogs
        })
    }
}

export default blogReducer