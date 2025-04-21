import { useState } from "react";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("all");

  // function to add new todo
  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      console.log("New Todo:", newTodo);

      setTodos([...todos, { text: newTodo, completed: false, id: Date.now() }]);
      setNewTodo("");
    } else {
      console.log("Input field is empty");
    }
  };

  // function to toggle completed
  const handleToggleCompleted = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }

        return todo;
      })
    );
  };

  // function to remove todo
  const handleRemoveTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;

    return true;
  });
  return (
    <div className="flex flex-col md:w-[500px] w-[400px]">
      <h1 className="md:text-3xl mb-4 bg-gradient-to-r from-pink-500 to-purple-500 text-[#f1f1f1] py-2 mx-auto px-4 rounded-md">
        Todo App using useState Hook
      </h1>

      <div className="flex gap-4 flex-col">
        <form
          className="flex gap-2 justify-between"
          onSubmit={(e) => {
            e.preventDefault();
            handleAddTodo();
          }}
        >
          <input
            type="text"
            className="bg-white rounded-md pl-2 outline-none w-3/4"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Enter your todo here"
          />

          <button
            className="bg-blue-400 outline-none  hover:text-white hover:bg-blue-600 py-2 px-4 rounded-md w-1/4"
            onClick={handleAddTodo}
          >
            Add Todo
          </button>
        </form>

        {/* List of filteredTodos */}
        <ul className="flex flex-col gap-2">
          {filteredTodos.map((todo, index) => (
            <li
              key={todo.id}
              className={`flex justify-between gap-2  text-white rounded-md py-2 px-2 ${
                index % 2 === 0 ? "bg-purple-500" : "bg-pink-500"
              } ${todo.completed ? "line-through" : "none"}`}
            >
              <span>{index + 1}.</span>
              <span onClick={() => handleToggleCompleted(todo.id)}>
                {todo.text}
              </span>
              <button onClick={() => handleRemoveTodo(todo.id)}>Remove</button>
            </li>
          ))}
        </ul>

        {/* filter buttons */}
        <div className="flex gap-3 justify-center">
          <button
            className="bg-blue-400 hover:text-white hover:bg-blue-600 py-2 px-4 rounded-md"
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className="bg-blue-400 hover:text-white hover:bg-blue-600 py-2 px-4 rounded-md"
            onClick={() => setFilter("active")}
          >
            Active
          </button>
          <button
            className="bg-blue-400 hover:text-white hover:bg-blue-600 py-2 px-4 rounded-md"
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>
      </div>
    </div>
  );
};

export default Todo;
