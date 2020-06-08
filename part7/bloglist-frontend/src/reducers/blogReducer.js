import blogService from '../services/blogs'

// reducer
const blogReducer = (state=[], action) => {
    switch (action.type) {
        case 'INIT':
            return action.data
        case 'CREATE':
            return [...state, action.data]
        case 'LIKE':
            const liked = action.data
            return state.map(b => b.id===liked.id ? liked : b)
        case 'DELETE':
            return state.filter(b => b.id !== action.id)
        default:
            return state
    }
}

// action creator
export const initializeBlogs = () => {
    return async dispatch => {
        const data = await blogService.getAll()

        dispatch({
            type: 'INIT',
            data
        })
    }
}

export const createBlog = (blog) => {
    return async dispatch => {
        const data = await blogService.create(blog)
        
        dispatch({
            type: 'CREATE',
            data
        })
    }
}

export const likeBlog = (blog) => {
    return async dispatch => {
        const toLike = { ...blog, likes: blog.likes + 1 }
        const data = await blogService.update(toLike)

        dispatch({
            type: 'LIKE',
            data
        })
    }
}

export const removeBlog = (id) => {
    return async dispatch => {
        blogService.remove(id)

        dispatch({
            type: 'DELETE',
            id
        })
    }
}

export default blogReducer