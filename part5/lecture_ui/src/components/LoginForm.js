import React from 'react'

const LoginForm = ({
    handleUsernameChange,
    handlePasswordChange,
    handleLogin,
    username,
    password
  }) => {
  return (
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
  )
}

export default LoginForm