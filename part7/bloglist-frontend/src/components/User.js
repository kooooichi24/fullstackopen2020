import React from 'react'

import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const User =  () => {
    const { id } = useParams();
    const user = useSelector(state => state.users.find(u => u.id === id))

    // conditional rendering 
    if (!user) {
        return null
    }

    return (
        <div>
            <h3>{ user.username }</h3>
            <b>added blogs</b>
            <ul>
                {user.blogs.map(blog => 
                    <li key={blog.id}>{blog.title}</li>    
                )}
            </ul>
        </div>
    )
}

export default User