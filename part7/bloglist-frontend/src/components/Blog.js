import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
// import { useParams, useHistory } from 'react-router-dom'

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()
  // const id = useParams().id
  // console.log(id)

  const [ visible, setVisible ] = useState(false)

  const button_text = visible ? 'hide' : 'view'
  const viewInfo = { display: visible ? '' : 'none' }
  const deleteBottonView = () => {
    if (!blog.user) {
      return { display: 'none' }
    }
    return { display: blog.user.username !== user.username ? 'none' : '' }
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const incrementLike = () => {
    dispatch(likeBlog(blog))
  }

  const onRemoveBlog = () => {
    console.log('click remove botton')
    const ok = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (ok) {
      dispatch(removeBlog(blog.id))
      dispatch(setNotification(`succeed delete blog: ${blog.title}`))
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className='blog'>
      <div>
        {blog.title}
        <button onClick={toggleVisibility}>{button_text}</button>
      </div>
      <div style={viewInfo} className='viewInfo'>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button onClick={incrementLike} className='likeButton'>like</button>
        </div>
        <div>{blog.author}</div>

        <button style={deleteBottonView()} onClick={onRemoveBlog}>
            remove
        </button>
      </div>
    </div>
  )
}

export default Blog