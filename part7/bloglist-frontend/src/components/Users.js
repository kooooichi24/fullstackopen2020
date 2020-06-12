import React from 'react'
import { Link } from 'react-router-dom'  
import { useSelector } from 'react-redux'

const Users = () => {
    const users = useSelector(state => state.users)

    return (
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th>blogs created</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => 
                    <tr key={user.id}>
                        <td>
                            <Link to={`/users/${user.id}`}>{user.username}</Link>
                        </td>
                        <td>{user.blogs.length}</td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export default Users