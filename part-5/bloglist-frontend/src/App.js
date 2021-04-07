import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
        blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
        const user = await loginService.login({username, password})
        window.localStorage.setItem(
            'loggedBlogUser', JSON.stringify(user)
        )
        blogService.setToken(user.token)
        setUser(user)
        setUsername('')
        setPassword('')
    } catch (exception) {
        console.log('error')
    }
  }

  const loginForm = () => (
      <form onSubmit={handleLogin}>
          <div>
              username: 
              <input
              type="text"
              value={username}
              name="Username"
              onChange={({target}) => setUsername(target.value)}
              />
          </div>
          <div>
              password:
              <input
              type="text"
              value={password}
              name="Password"
              onChange={({target}) => setPassword(target.value)}
              />
          </div>
          <button type="submit">login</button>
      </form>
  )

  const logout = () => {
    window.localStorage.removeItem('loggedNoteappUser');
    setUser(null);
  }

  if (user === null) {
      return (
          <div>
              <p>log in to application</p>
            {loginForm ()}
          </div>
      )
  }
  return (
    <div>
      <h2>{user.name}'s Blogs</h2>
      <button onClick={logout}>Logout</button>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App