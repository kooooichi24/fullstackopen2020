import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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

  const handleLogin = async (event) => {
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
    } catch(exception) {
      console.log(exception)
    }
  }

  const handleCreateForm = async (event) => {
    event.preventDefault()
    try {
      const newObject = { title, author, url }

      const returnedBlog = await blogService.create(newObject)
      setBlogs(blogs.concat(returnedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch(exception) {
      console.log(exception)
    }
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  
  const handleUrlChange = (event) => {
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
      <form onSubmit={handleLogin}>
        <div>
          username
          <input type="text" value={username} name="Username" onChange={handleUsernameChange} />
        </div>
        <div>
          password
          <input type="text" value={password} name="Password" onChange={handlePasswordChange} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const blogForm = () => (
    <div>
      <h1>create new</h1>
      <form onSubmit={handleCreateForm}>
        <div>
          title:
          <input type="text" value={title} name="Title" onChange={handleTitleChange} />
        </div>
        <div>
          author:
          <input type="text" value={author} name="Author" onChange={handleAuthorChange} />
        </div>
        <div>
          url:
          <input type="text" value={url} name="Url" onChange={handleUrlChange} />
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