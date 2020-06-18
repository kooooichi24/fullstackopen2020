import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../reducers/userReducer'
import storage from '../utils/storage'

const NavBar = () => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
        storage.loadUser()
    }

    const padding = {
        padding: 5
    }

    const navStyle = {
        margin: 10,
        padding: 10,
        backgroundColor: 'lightgray'
    }

    return (
        <div style={navStyle}>
            <Link to="/" style={padding}>blogs</Link>
            <Link to="/users" style={padding}>users</Link>
            <span>{user.username} logged in <button onClick={handleLogout}>logout</button></span>
        </div>
    )
}

export default NavBar