import { useState, useEffect } from "react";

import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";

import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogout = (event) => {
    event.preventDefault();
    console.log("logout", user.name);
    window.localStorage.clear();
    setUser(null);
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in with", username, password);

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
      setErrorMessage("Wrong Credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const addBlog = async (event) => {
    event.preventDefault();
    console.log(`title: ${title} Author: ${author}, Url: ${url}`);
    try {
      const newBlog = {
        title: title,
        author: author,
        url: url,
      };
      const response = await blogService.create(newBlog);
      blogService.getAll().then((blogs) => setBlogs(blogs));
      setAuthor("");
      setTitle("");
      setUrl("");
    } catch (exception) {
      setErrorMessage("Error adding blog");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
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
        <Notification message={errorMessage} />
        <h1>Blogs</h1>
        {loginForm()}
      </div>
    );
  }
  return (
    <div>
      <h1>blogs</h1>
      <p>
        {user.name} logged-in
        <button onClick={handleLogout}>logout</button>
      </p>
      <BlogForm
        addBlog={addBlog}
        setTitle={setTitle}
        title={title}
        setAuthor={setAuthor}
        author={author}
        setUrl={setUrl}
        url={url}
      />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
