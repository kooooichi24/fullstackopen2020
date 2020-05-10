import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [ visible, setVisible ] = useState(false)

  const button_text = visible ? "hide" : "view"
  const viewInfo = { display: visible ? '' : 'none' }
  const toggleVisibility = () => {
    setVisible(!visible)
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
        <div>{blog.author}</div>
        <div>{blog.likes}</div>
        <div>{blog.url}</div>
      </div>
    </div>
  )
}

export default Blog
