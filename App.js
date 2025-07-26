import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser,
  FaLock,
  FaSignInAlt,
  FaPlus,
  FaEdit,
  FaTrash,
  FaCheck,
  FaTimes,
  FaSignOutAlt,
  FaClipboardList,
  FaCheckCircle,
  FaExclamationTriangle,
  FaCheckSquare,
  FaSquare,
} from "react-icons/fa";
import "./App.css";

const API_URL = "http://localhost:4000";

function App() {
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch todos after login
  useEffect(() => {
    if (token) fetchTodos();
  }, [token]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setIsSubmitting(true);

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setToken(data.token);
        setUsername(data.username);
        setPassword("");
      } else {
        setLoginError(data.message || "Login failed");
      }
    } catch (err) {
      setLoginError("Network error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchTodos = async () => {
    setLoading(true);
    const res = await fetch(`${API_URL}/items`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      setTodos(await res.json());
    }
    setLoading(false);
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    const res = await fetch(`${API_URL}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text: newTodo }),
    });
    if (res.ok) {
      setNewTodo("");
      fetchTodos();
    }
  };

  const handleEditTodo = (todo) => {
    setEditId(todo.id);
    setEditText(todo.text);
  };

  const handleUpdateTodo = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/items/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text: editText }),
    });
    if (res.ok) {
      setEditId(null);
      setEditText("");
      fetchTodos();
    }
  };

  const handleToggleComplete = async (todo) => {
    const res = await fetch(`${API_URL}/items/${todo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        text: todo.text,
        completed: !todo.completed,
      }),
    });
    if (res.ok) {
      fetchTodos();
    }
  };

  const handleDeleteTodo = async (id) => {
    await fetch(`${API_URL}/items/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchTodos();
  };

  const handleLogout = () => {
    setToken("");
    setTodos([]);
    setNewTodo("");
    setEditId(null);
    setEditText("");
  };

  if (!token) {
    return (
      <motion.div
        className="login-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}>
        <motion.div
          className="login-card"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}>
          <motion.div
            className="login-header"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}>
            <FaClipboardList className="login-icon" />
            <h2>Welcome Back</h2>
            <p>Sign in to manage your tasks</p>
          </motion.div>

          <motion.form
            onSubmit={handleLogin}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}>
            <div className="input-group">
              <FaUser className="input-icon" />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <FaLock className="input-icon" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <motion.button
              type="submit"
              className="login-btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}>
              {isSubmitting ? (
                <motion.div
                  className="spinner"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              ) : (
                <>
                  <FaSignInAlt />
                  Sign In
                </>
              )}
            </motion.button>
          </motion.form>

          <AnimatePresence>
            {loginError && (
              <motion.div
                className="error-message"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}>
                <FaExclamationTriangle />
                {loginError}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            className="login-hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}>
            <FaCheckCircle />
            Try: <strong>admin</strong> / <strong>password</strong>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="todo-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}>
      <motion.div
        className="todo-header"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}>
        <div className="header-content">
          <FaClipboardList className="header-icon" />
          <div>
            <h2>Task Manager</h2>
            <p>Welcome, {username}!</p>
          </div>
        </div>
        <motion.button
          onClick={handleLogout}
          className="logout-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}>
          <FaSignOutAlt />
          Logout
        </motion.button>
      </motion.div>

      <motion.form
        onSubmit={handleAddTodo}
        className="add-todo-form"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}>
        <div className="input-group">
          <FaPlus className="input-icon" />
          <input
            type="text"
            placeholder="Add a new task..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
        </div>
        <motion.button
          type="submit"
          className="add-btn"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}>
          <FaPlus />
          Add
        </motion.button>
      </motion.form>

      <motion.div
        className="todos-section"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}>
        {loading ? (
          <motion.div
            className="loading"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
            <FaClipboardList />
          </motion.div>
        ) : (
          <AnimatePresence>
            {todos.map((todo, index) => (
              <motion.div
                key={todo.id}
                className={`todo-item ${todo.completed ? "completed" : ""}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.02 }}>
                {editId === todo.id ? (
                  <form onSubmit={handleUpdateTodo} className="edit-form">
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      autoFocus
                    />
                    <div className="edit-actions">
                      <motion.button
                        type="submit"
                        className="save-btn"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}>
                        <FaCheck />
                      </motion.button>
                      <motion.button
                        type="button"
                        onClick={() => setEditId(null)}
                        className="cancel-btn"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}>
                        <FaTimes />
                      </motion.button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="todo-content">
                      <motion.button
                        onClick={() => handleToggleComplete(todo)}
                        className="complete-btn"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}>
                        {todo.completed ? <FaCheckSquare /> : <FaSquare />}
                      </motion.button>
                      <span
                        className={`todo-text ${
                          todo.completed ? "completed-text" : ""
                        }`}>
                        {todo.text}
                      </span>
                    </div>
                    <div className="todo-actions">
                      <motion.button
                        onClick={() => handleEditTodo(todo)}
                        className="edit-btn"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}>
                        <FaEdit />
                      </motion.button>
                      <motion.button
                        onClick={() => handleDeleteTodo(todo.id)}
                        className="delete-btn"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}>
                        <FaTrash />
                      </motion.button>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        )}

        {todos.length === 0 && !loading && (
          <motion.div
            className="empty-state"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}>
            <FaClipboardList />
            <p>No tasks yet. Add your first task above!</p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default App;
