import React, { useState } from 'react'

const Blog = ({ blog, user, updateBlog, removeBlog }) => {
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
    const newObject = {
      user: blog.user.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }

    updateBlog(blog.id, newObject)
  }

  const onRemoveBlog = () => {
    console.log('click remove botton')
    const ok = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (ok) {
      removeBlog(blog)
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
    <div style={blogStyle}>
      <div>
        {blog.title}
        <button onClick={toggleVisibility}>{button_text}</button>
      </div>
      <div style={viewInfo}>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button onClick={incrementLike}>like</button>
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