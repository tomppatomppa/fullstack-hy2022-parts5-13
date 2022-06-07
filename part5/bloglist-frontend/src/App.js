import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'

import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'

import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [notification, setNotification] = useState(null)

  useEffect(() => {
    reloadBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const reloadBlogs = () => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
  }

  const handleRemoveButton = async (id) => {
    const result = blogs.find((blog) => blog.id)
    if (
      result &&
      window.confirm(`Remove blog ${result.title} by ${result.author}`)
    ) {
      try {
        await blogService.deleteBlog(id)
        reloadBlogs()
      } catch (err) {
        notify('Error removing blog', 'alert')
      }
    }
  }

  const handleLikeButton = async (id) => {
    const blog = blogs.filter((blog) => blog.id === id)
    console.log(blog)
    const updateBlog = {
      user: blog.user,
      likes: blog[0].likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }
    await blogService.update(id, updateBlog)
    reloadBlogs()
  }

  const handleLogout = (event) => {
    event.preventDefault()
    console.log('logout', user.name)
    window.localStorage.clear()
    setUser(null)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)

      setUsername('')
      setPassword('')
    } catch (exception) {
      notify('Wrong Credentials', 'alert')
    }
  }

  const notify = (message, type = 'info') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const addBlog = async (blogObject) => {
    try {
      await blogService.create(blogObject)
      notify(`a new blog ${blogObject.title} by ${blogObject.author} added`)
      reloadBlogs()
    } catch (err) {
      notify('error adding blog', 'alert')
    }
  }

  // const loginForm = () => (
  //   <form onSubmit={handleLogin}>
  //     <h2>login to application</h2>
  //     <div>
  //       username
  //       <input
  //         type="text"
  //         value={username}
  //         name="Username"
  //         onChange={({ target }) => setUsername(target.value)}
  //       />
  //     </div>
  //     <div>
  //       password
  //       <input
  //         type="password"
  //         value={password}
  //         name="Password"
  //         onChange={({ target }) => setPassword(target.value)}
  //       />
  //     </div>
  //     <button>login</button>
  //   </form>
  // )

  const noteFormRef = useRef()

  if (user === null) {
    return (
      <div>
        <h1>Blogs</h1>
        <Notification message={notification} />
        <LoginForm
          handleSubmit={handleLogin}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          username={username}
          password={password}
        />
      </div>
    )
  }
  return (
    <div>
      <h1>blogs</h1>
      <Notification message={notification} />
      <p>
        {user.name} logged-in
        <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel="new blog" ref={noteFormRef}>
        <BlogForm createBlog={addBlog} user={user} />
      </Togglable>

      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          user={user}
          blog={blog}
          handleLikeChange={handleLikeButton}
          handleRemoveBlog={handleRemoveButton}
        />
      ))}
    </div>
  )
}

export default App
