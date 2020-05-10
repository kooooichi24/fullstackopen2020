import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [ blogs, setBlogs ] = useState([])
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ user, setUser ] = useState(null)
  const [ notification, setNotification ] = useState(null)

  const sortBlogs = (blogs) => {
    return blogs.sort((a,b) => b.likes - a.likes)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( sortBlogs(blogs) )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notifyWith = (message, type='success') => {
    setNotification({message, type})
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      notifyWith('succeed login')
    } catch(exception) {
      notifyWith('wrong username or password', 'error')
      console.log(exception)
    }
  }

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()

      const returnedBlog = await blogService.create(blogObject)
      setBlogs( sortBlogs(blogs.concat(returnedBlog)) )
      
      notifyWith(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
    } catch(exception) {
      notifyWith('title or author invalid', 'error')
      console.log(exception)
    }
  }

  const updateBlog = async (id, blogObject) => {
    const updatedBlog = await blogService.update(id, blogObject)
    setBlogs( sortBlogs(blogs.map(b => b.id !== id ? b : updatedBlog)) )
  }

  const changeUsername = (event) => {
    setUsername(event.target.value)
  }

  const changePassword = (event) => {
    setPassword(event.target.value)
  }

  const logout = () => {
    window.localStorage.clear()
    blogService.setToken(null)
    setUser(null)
  }

  const loginForm = () => (
    <div>
      <h1>log in to application</h1>
      <Notification notification={notification} />
      <form onSubmit={login}>
        <div>
          username
          <input type="text" value={username} name="Username" onChange={changeUsername} />
        </div>
        <div>
          password
          <input type="text" value={password} name="Password" onChange={changePassword} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const blogFormRef = React.createRef()

  const blogForm = () => (
    <Togglable buttonLabel="create" ref={blogFormRef}>
      <BlogForm
        createBlog={addBlog}
      />
    </Togglable>
  )

  if (user === null) {
    return (
      loginForm()
    )
  }

  return (
    <div>
      <h1>blogs</h1>
      <Notification notification={notification} />

      <p>
        {user.username} logged in 
        <button onClick={logout}>logout</button>
      </p>
      
      {blogForm()}

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} />
      )}
    </div>
  )
}

export default App