import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { commentBlog } from '../reducers/blogReducer'

const Comments = () => {
    const { id } = useParams()
    const blog = useSelector(state => state.blogs.find(b => b.id === id))
    const comments = blog.comments
    const dispatch = useDispatch()

    const addComment = (event) => {
        event.preventDefault()
        const content = event.target.comment.value
        event.target.comment.value = ''

        dispatch(commentBlog(id, content))
    }

    return (
        <div>
            <h3>comments</h3>
            <form onSubmit={addComment}>
                <input name="comment" />
                <button type="submit">add comment</button>
            </form>
            <ul>
              {comments.map(comment => 
                <li key={comment}>{comment}</li>
              )}
            </ul>
        </div>
    )
}

export default Comments