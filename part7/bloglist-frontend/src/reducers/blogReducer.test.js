import blogReducer from './blogReducer'
import blogService from '../services/blogs'
import deepFreeze from 'deep-freeze'

describe('blogReducer', () => {
    test('test INIT_BLOG', () => {
        const state = []
        const blogs = blogService.getAll().then(res => res.data)
        const action = {
            type: 'INIT_BLOG',
            data: blogs
        }
        
        deepFreeze(state)
        const newState = blogReducer(state, action)
        expect(newState).toEqual(blogs)
    })
})