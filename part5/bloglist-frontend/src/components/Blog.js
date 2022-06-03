import { useState } from 'react'

const Blog = ({ user, blog, handleLikeChange, handleRemoveBlog }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle}>
      <div data-testid="initial-element" style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div data-testid="hidden-element" style={showWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>hide</button>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes ? blog.likes : 0}{' '}
          <button onClick={() => handleLikeChange(blog.id)}>like</button>
        </div>
        <div>{blog.user.name}</div>
        {user.username === blog.user.username && (
          <button onClick={() => handleRemoveBlog(blog.id)}>remove</button>
        )}
      </div>
    </div>
  )
}

export default Blog
