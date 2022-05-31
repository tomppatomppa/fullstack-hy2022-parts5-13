const BlogForm = ({
  addBlog,
  setTitle,
  title,
  setAuthor,
  author,
  setUrl,
  url,
}) => (
  <div>
    <h1>create new</h1>
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        ></input>
      </div>
      <div>
        author:
        <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        ></input>
      </div>
      <div>
        url:
        <input
          type="text"
          value={url}
          name={"Url"}
          onChange={({ target }) => setUrl(target.value)}
        ></input>
      </div>
      <button>create</button>
    </form>
  </div>
);

export default BlogForm;
