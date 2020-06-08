import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import loginService from '../services/login'
import { login } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import storage from '../utils/storage'

const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password
            })

            setUsername('')
            setPassword('')
            dispatch(login(user))
            dispatch(setNotification('succeed login'))
            storage.saveUser(user)
        } catch(exception) {
            dispatch(setNotification('wrong username/password', 'error'))
        }
    }

    return (
        <div>
            <form onSubmit={handleLogin}>
              <div>
                username
                <input id='username' type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
              </div>
              <div>
                password
                <input id='password' type="text" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
              </div>
              <button id='login-button' type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm