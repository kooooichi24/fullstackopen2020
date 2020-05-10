import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [ blogs, setBlogs ] = useState([])
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ user, setUser ] = useState(null)
  const [ title, setTitle ] = useState('')
  const [ author, setAuthor ] = useState('')
  const [ url, setUrl ] = useState('')
  const [ notification, setNotification ] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
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

  const createForm = async (event) => {
    event.preventDefault()
    try {
      const newObject = { title, author, url }

      const returnedBlog = await blogService.create(newObject)
      setBlogs(blogs.concat(returnedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      notifyWith(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
    } catch(exception) {
      notifyWith('title or author invalid', 'error')
      console.log(exception)
    }
  }

  const changeUsername = (event) => {
    setUsername(event.target.value)
  }

  const changePassword = (event) => {
    setPassword(event.target.value)
  }

  const changeTitle = (event) => {
    setTitle(event.target.value)
  }

  const changeAuthor = (event) => {
    setAuthor(event.target.value)
  }
  
  const changeUrl = (event) => {
    setUrl(event.target.value)
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

  const blogForm = () => (
    <div>
      <h1>create new</h1>
      <form onSubmit={createForm}>
        <div>
          title:
          <input type="text" value={title} name="Title" onChange={changeTitle} />
        </div>
        <div>
          author:
          <input type="text" value={author} name="Author" onChange={changeAuthor} />
        </div>
        <div>
          url:
          <input type="text" value={url} name="Url" onChange={changeUrl} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
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
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App