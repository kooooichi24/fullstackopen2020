import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom'

import Blog from './components/Blog'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import User from './components/User'
import storage from './utils/storage'

import { initializeBlogs, createBlog } from './reducers/blogReducer'
import { login, logout } from './reducers/userReducer'
import { setNotification } from './reducers/notificationReducer'
import { initializeUsers } from './reducers/usersReducer'

const App = () => {
  const user = useSelector(state => state.user)
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
    
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

  if ( !user ) {
    return (
      <div>
        <h2>Login to application</h2>

        <Notification notification={notification} />
        <LoginForm />
      </div>
    )
  }

  return (
    <Router>
      <div>
        <h1>blogs</h1>
        <Notification notification={notification} />
        <span>
          {user.username} logged in <button onClick={handleLogout}>logout</button>
        </span>

        <Switch>
          <Route exact path="/">
            <Togglable buttonLabel="create" ref={blogFormRef}>
              <BlogForm createBlog={addBlog}/>
            </Togglable>
            <Blogs />
          </Route>
          <Route exact path="/users">
            <Users />
          </Route>
          <Route exact path="/users/:id">
            <User />
          </Route>
          <Route exact path="/blogs/:id">
            <Blog />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App