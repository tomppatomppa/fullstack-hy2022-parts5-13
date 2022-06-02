const BlogForm = ({
  handleSubmit,
  title,
  author,
  url,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
}) => (
  <div>
    <h1>create new</h1>
    <form onSubmit={handleSubmit}>
      <div>
        title:
        <input value={title} name="Title" onChange={handleTitleChange}></input>
      </div>
      <div>
        author:
        <input
          value={author}
          name="Author"
          onChange={handleAuthorChange}
        ></input>
      </div>
      <div>
        url:
        <input value={url} name={'Url'} onChange={handleUrlChange}></input>
      </div>
      <button type="submit">create</button>
    </form>
  </div>
)

export default BlogForm
