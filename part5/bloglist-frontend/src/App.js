import { useState, useEffect } from "react";

import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const [notification, setNotification] = useState(null);

  useEffect(() => {
    reloadBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const reloadBlogs = () => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
    console.log(blogs);
  };

  const handleLikeButton = async (id) => {
    const blog = blogs.filter((blog) => blog.id === id);
    console.log(blog);
    const updateBlog = {
      user: blog.user,
      likes: blog[0].likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    };
    await blogService.update(id, updateBlog);
    reloadBlogs();
  };

  const handleLogout = (event) => {
    event.preventDefault();
    console.log("logout", user.name);
    window.localStorage.clear();
    setUser(null);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      notify("Wrong Credentials", "alert");
    }
  };
  const notify = (message, type = "info") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const addBlog = async (event) => {
    event.preventDefault();
    console.log(`title: ${title} Author: ${author}, Url: ${url}`);

    const newBlog = {
      title: title,
      author: author,
      url: url,
    };
    try {
      await blogService.create(newBlog);
      notify(`a new blog ${title} by ${author} added`);
      reloadBlogs();
      setAuthor("");
      setTitle("");
      setUrl("");
    } catch (err) {
      notify("error adding blog", "alert");
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>login to application</h2>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button>login</button>
    </form>
  );

  if (user === null) {
    return (
      <div>
        <h1>Blogs</h1>
        <Notification message={notification} />
        {loginForm()}
      </div>
    );
  }
  return (
    <div>
      <h1>blogs</h1>
      <Notification message={notification} />
      <p>
        {user.name} logged-in
        <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel="new blog">
        <BlogForm
          handleSubmit={addBlog}
          title={title}
          author={author}
          url={url}
          handleTitleChange={({ target }) => setTitle(target.value)}
          handleAuthorChange={({ target }) => setAuthor(target.value)}
          handleUrlChange={({ target }) => setUrl(target.value)}
        />
      </Togglable>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} handleLikeChange={handleLikeButton} />
      ))}
    </div>
  );
};

export default App;
