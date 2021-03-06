import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/blogForm'
import Togglable from './components/toggle'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')


  const getAllBlogsHook = async () => {
      console.log('Getting all blogs');
        await blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )  
  }

  useEffect(getAllBlogsHook, []);

  useEffect(async () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
        await blogService.setToken(user.token)
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

  const handleBlogCreation = async (newBlog) => {
      console.log('creating a new blog', newBlog)
      try {
          await blogService.create(newBlog)
          await getAllBlogsHook()        
      } catch {
          console.log('blog creation error')
      }
  }

  const handleLike = async (blog) => {
      console.log('adding like', blog);
      try {
        await blogService.update(blog)
        getAllBlogsHook()        
      } catch {
        console.log('update error')
      }
  }

  const handleDelete = async (blog) => {
    console.log('deleting blog', blog)
    try {
        await blogService.deleteBlog(blog)
        getAllBlogsHook();
    } catch {

    }
  }
  const loginForm = () => (
      <form onSubmit={handleLogin}>
          <div>
              username: 
              <input
              id="login-username"
              type="text"
              value={username}
              name="Username"
              onChange={({target}) => setUsername(target.value)}
              />
          </div>
          <div>
              password:
              <input
              id="login-password"
              type="text"
              value={password}
              name="Password"
              onChange={({target}) => setPassword(target.value)}
              />
          </div>
          <button id="login-submit" type="submit">login</button>
      </form>
  )

  const createForm = () => (
    <Togglable buttonLabel="new blog">
        <BlogForm
            createBlog={handleBlogCreation}
        />
    </Togglable>
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
      {createForm ()}
      {blogs.sort(function(a, b) {
            return b.likes - a.likes
        }).map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete}/>
      )}
    </div>
  )
}

export default App