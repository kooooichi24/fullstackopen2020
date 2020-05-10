import React, { useState } from 'react'

const Blog = ({ blog, updateBlog }) => {
  const [ visible, setVisible ] = useState(false)

  const button_text = visible ? "hide" : "view"
  const viewInfo = { display: visible ? '' : 'none' }
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const incrementLike = async () => {
    const newObject = {
      user: blog.user.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }

    updateBlog(blog.id, newObject)
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
      </div>
    </div>
  )
}

export default Blog