import { useState } from 'react'

const BlogForm = ({ createBlog, user }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }
  const handleAddBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      likes: 0,
      url: url,
      user: user,
    })
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <div>
      <h1>create blog</h1>
      <form onSubmit={handleAddBlog}>
        <div>
          Title:
          <input
            id="title"
            value={title}
            onChange={handleTitleChange}
            placeholder={'title content'}
          />
        </div>
        <div>
          Author:
          <input
            id="author"
            value={author}
            onChange={handleAuthorChange}
            placeholder={'author content'}
          />
        </div>
        <div>
          Url:
          <input
            id="url"
            value={url}
            onChange={handleUrlChange}
            placeholder={'url content'}
          />
        </div>
        <button id="create-button" type="submit">
          create
        </button>
      </form>
    </div>
  )
}

export default BlogForm
