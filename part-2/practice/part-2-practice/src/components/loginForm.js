import React from 'react'

const LoginForm = ({
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password
}) => {
    return (
    <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
            <div>
            username 
                <input
                id="login-username"
                type="text"
                value={username}
                name="Username"
                onChange={handleUsernameChange}
                />
            </div>
            <div>
            password 
                <input
                id="login-password"
                type="password"
                value={password}
                name="Password"
                onChange={handlePasswordChange}
                />
            </div>
        <button id="login-submit" type="submit">login</button>
        </form>
    </div>
    )
}

export default LoginForm