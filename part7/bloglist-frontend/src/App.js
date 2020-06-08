import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import storage from './utils/storage'

import { initializeBlogs, createBlog } from './reducers/blogReducer'
import { login, logout } from './reducers/userReducer'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    
    const user = storage.loadUser()
    if (user) {
      dispatch(login(user))
    }
  }, [dispatch])

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()

      dispatch(createBlog(blogObject))
      dispatch(setNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`))
    } catch(exception) {
      dispatch(setNotification('title or author invalid', 'error'))
      console.log(exception)
    }
  }

  const handleLogout = () => {
    dispatch(logout())
    storage.loadUser()
  }

  const blogFormRef = React.createRef()

  const blogForm = () => (
    <Togglable buttonLabel="create" ref={blogFormRef}>
      <BlogForm
        createBlog={addBlog}
      />
    </Togglable>
  )

  if ( !user ) {
    return (
      <div>
        <h2>Login to application</h2>

        <Notification notification={notification} />
        <LoginForm />
      </div>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      <h1>blogs</h1>
      <Notification notification={notification} />

      <p>
        {user.username} logged in
        <button onClick={handleLogout}>logout</button>
      </p>

      {blogForm()}

      {blogs.sort(byLikes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
        />
      )}
    </div>
  )
}

export default App