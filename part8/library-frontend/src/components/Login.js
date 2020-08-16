import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../utils/querys'

const Login = ({ show, setToken, setPage }) => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')

  const [ login, result ] = useMutation(LOGIN, {
    onError: (err) => {
      console.log(err.graphQLErrors[0].message)
      // setError(err.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      setPage('authors')
      localStorage.setItem('token', token)
    }
  }, [result.data]) // eslint-disable-line

  const submit = (event) => {
    event.preventDefault()

    console.log(event)
    login({ variables: { username, password }})
  }

  if (!show) {
    return null
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username: <input value={username} onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          password: <input value={password} type='password' onChange={({ target }) => setPassword(target.value)} />
        </div>
        <div>
          <button type='submit'>login</button>
        </div>
      </form>
    </div>
  )
}

export default Login