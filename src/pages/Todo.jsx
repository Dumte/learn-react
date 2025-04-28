import { useState } from "react";
import { FiEdit2, FiTrash2, FiCheck, FiX } from "react-icons/fi";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleAddTodo = (e) => {
    e?.preventDefault();
    if (newTodo.trim()) {
      setTodos((prevTodos) => [
        ...prevTodos,
        { text: newTodo, completed: false, id: Date.now() },
      ]);
      setNewTodo("");
    }
  };

  const handleToggleCompleted = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleRemoveTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditText("");
  };

  const saveEdit = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, text: editText } : todo
      )
    );
    setEditingId(null);
  };

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case "active":
        return !todo.completed;
      case "completed":
        return todo.completed;
      default:
        return true;
    }
  });

  const filterButtons = [
    { value: "all", label: "All" },
    { value: "active", label: "Active" },
    { value: "completed", label: "Completed" },
  ];

  return (
    <div className="flex flex-col w-full max-w-md rounded-md my-2 mx-auto p-4  bg-blue-100">
      <h1 className="text-2xl md:text-3xl mb-6 text-center bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 px-6 rounded-lg shadow">
        Todo App
      </h1>

      <div className="flex flex-col gap-4">
        <form onSubmit={handleAddTodo} className="flex gap-2 w-full">
          <input
            type="text"
            className="flex-grow p-2 rounded border bg-white border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Enter your todo"
            aria-label="Add new todo"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors whitespace-nowrap"
          >
            Add
          </button>
        </form>

        {todos.length > 0 && (
          <div className="flex gap-2 justify-center">
            {filterButtons.map(({ value, label }) => (
              <button
                key={value}
                className={`py-1 px-3 rounded transition-colors ${
                  filter === value
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                onClick={() => setFilter(value)}
              >
                {label}
              </button>
            ))}
          </div>
        )}

        <ul className="flex flex-col gap-2">
          {filteredTodos.length === 0 ? (
            <li className="text-center py-4 text-gray-500 bg-gray-100 rounded">
              {todos.length === 0
                ? "No todos yet!"
                : "No todos match this filter"}
            </li>
          ) : (
            filteredTodos.map((todo) => (
              <li
                key={todo.id}
                className={`flex items-center justify-between p-3 rounded shadow-sm transition ${
                  todo.completed ? "bg-green-50" : "bg-white"
                }`}
              >
                <div className="flex items-center gap-3 flex-grow">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggleCompleted(todo.id)}
                    className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />

                  {editingId === todo.id ? (
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="flex-grow p-1 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                      autoFocus
                    />
                  ) : (
                    <span
                      className={`flex-grow cursor-pointer ${
                        todo.completed ? "line-through text-gray-500" : ""
                      }`}
                      onClick={() => handleToggleCompleted(todo.id)}
                    >
                      {todo.text}
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  {editingId === todo.id ? (
                    <>
                      <button
                        onClick={() => saveEdit(todo.id)}
                        className="text-green-500 hover:text-green-700 p-1 rounded hover:bg-green-50 transition-colors"
                        aria-label="Save edit"
                      >
                        <FiCheck size={18} />
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors"
                        aria-label="Cancel edit"
                      >
                        <FiX size={18} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEditing(todo.id, todo.text)}
                        className="text-blue-500 hover:text-blue-700 p-1 rounded hover:bg-blue-50 transition-colors"
                        aria-label="Edit todo"
                      >
                        <FiEdit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleRemoveTodo(todo.id)}
                        className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors"
                        aria-label="Remove todo"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))
          )}
        </ul>

        {todos.length > 0 && (
          <div className="text-center text-sm text-gray-500">
            {todos.filter((t) => t.completed).length} of {todos.length}{" "}
            completed
          </div>
        )}
      </div>
    </div>
  );
};

export default Todo;
