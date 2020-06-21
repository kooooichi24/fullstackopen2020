import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Comments from './Comments'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { useParams, useHistory } from 'react-router-dom'

const Blog = () => {
  const { id } = useParams()
  const blog = useSelector(state => state.blogs.find(b => b.id === id))
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const history = useHistory()

  const own = user && user.username === blog.user.username

  const handleLike = () => {
    dispatch(likeBlog(blog))
  }

  const handleRemove = () => {
    const ok = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (ok) {
      dispatch(removeBlog(blog.id))
      history.push('/')
    }
  }

  return (
    <div className='blog'>
      <h3>{blog.title} by {blog.author}</h3>
      <div>
        <div><a href={blog.url}>{blog.url}</a></div>
        <div>
          likes {blog.likes}
          <button onClick={handleLike} className='likeButton'>like</button>
        </div>
        {own && <button onClick={handleRemove}>remove</button>}
        <div>
          added by {blog.user.username}
        </div>
      </div>

      <Comments />
    </div>
  )
}

export default Blog