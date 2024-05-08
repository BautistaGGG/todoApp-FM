import { useState, useEffect } from "react"
import {v4 as uuidv4} from "uuid"
import TodoItem from "./componentes/TodoItem.jsx"

function App() {

  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });
  const [filter, setFilter] = useState("all");
  const [theme, setTheme] = useState("light");

  // Save todos to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function addTodo(text){
    setTodos([...todos, { id: uuidv4(), text, completed: false }]);
  }

  function toggleComplete(id){
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function deleteTodo(id){
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function clearCompleted(){
    setTodos(todos.filter((todo) => !todo.completed));
  }

  return (
<div className={`App ${theme === "dark" ? "dark" : ""}`}>
      <header className="py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Todo App</h1>
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="text-gray-600 dark:text-gray-400"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </header>
      <div className="px-6 py-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const text = e.target.elements.todo.value.trim();
            if (text) {
              addTodo(text);
              e.target.reset();
            }
          }}
        >
          <input
            type="text"
            name="todo"
            placeholder="Add new todo..."
            className="w-full rounded-md border border-gray-200 dark:border-gray-700 px-4 py-2 focus:outline-none focus:border-blue-400 dark:bg-gray-800 dark:text-gray-100"
          />
        </form>
        <div className="mt-4">
          {todos
            .filter((todo) => {
              if (filter === "active") {
                return !todo.completed;
              } else if (filter === "complete") {
                return todo.completed;
              }
              return true;
            })
            .map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
              />
            ))}
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm">
            {todos.filter((todo) => !todo.completed).length} items left
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter("all")}
              className={`text-sm ${
                filter === "all" ? "font-bold" : "text-gray-500"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("active")}
              className={`text-sm ${
                filter === "active" ? "font-bold" : "text-gray-500"
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter("complete")}
              className={`text-sm ${
                filter === "complete" ? "font-bold" : "text-gray-500"
              }`}
            >
              Completed
            </button>
          </div>
          <button
            onClick={clearCompleted}
            className="text-sm text-gray-500 hover:text-red-500"
          >
            Clear Completed
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
