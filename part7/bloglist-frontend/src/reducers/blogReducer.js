import blogService from '../services/blogs'

// reducer
const blogReducer = (state=[], action) => {
    switch (action.type) {
        case 'INIT_BLOG':
            return action.data
        case 'NEW_BLOG':
            return [...state, action.data]
        case 'LIKE_BLOG':
            console.log('reducer case like-blog')
            return state.map(s => s.id !== action.data.id ? state : action.data)
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

export const createBlog = (blogObject) => {
    return async dispatch => {
        const returnedBlog = await blogService.create(blogObject)
        
        dispatch({
            type: 'NEW_BLOG',
            data: returnedBlog
        })
    }
}

export const likeBlog = (id, likedBlog) => {
    return async dispatch => {
        const returnedBlog = await blogService.update(id, likedBlog)

        dispatch({
            type: 'LIKE_BLOG',
            data: returnedBlog
        })
    }
}

export default blogReducer