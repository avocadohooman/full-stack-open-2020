import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [newTitle, setTitle] = useState('')
  const [newAuthor, setAuthor] = useState('')
  const [newUrl, setUrl] = useState('')


  const getAllBlogsHook = () => {
      console.log('Getting all blogs');
    blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )  
  }

  useEffect(getAllBlogsHook, []);

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

  const handleBlogCreation = async (event) => {
      event.preventDefault()
      console.log('creating a new blog', newTitle, newAuthor, newUrl)
      const newBlog = {
          title: newTitle,
          author: newAuthor,
          url: newUrl
      }
      try {
          await blogService.create(newBlog)
          setTitle('')
          setUrl('')
          setAuthor('')
          getAllBlogsHook()        
      } catch {
          console.log('blog creation error')
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

  const createForm = () => (
      <form onSubmit={handleBlogCreation}>
          <div>
              title:
              <input
              type="text"
              value={newTitle}
              name="Title"
              onChange={({target}) => setTitle(target.value)}
              />
          </div>
          <div>
              author:
              <input
              type="text"
              value={newAuthor}
              name="Author"
              onChange={({target}) => setAuthor(target.value)}
              />
          </div>
          <div>
              url:
              <input
              type="text"
              value={newUrl}
              name="URL"
              onChange={({target}) => setUrl(target.value)}
              />
          </div>
          <button type="submit">create</button>
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
      {createForm ()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App