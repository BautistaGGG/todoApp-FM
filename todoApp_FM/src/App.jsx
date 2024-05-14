import { useState, useEffect } from "react"
import {v4 as uuidv4} from "uuid"
import TodoItem from "./componentes/TodoItem.jsx"
// import {iconoMoon} from "./assets/icon-moon.svg"
// import {iconoSun} from "./assets/icon-sun.svg"

function App() {

  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  const [filter, setFilter] = useState("all");
  const [theme, setTheme] = useState("light");

  // guardar TODOs en localStorage cuando sea que cambien
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
    <div className={`App ${theme === "dark" ? "dark" : ""} font-Josefin-sans`}>

      <header className={`py-28 px-6 flex justify-center items-center gap-6 ${theme === "light" ? "bg-bg-lightMode" : "bg-bg-darkMode"}`}>
        <h1 className="text-white text-2xl font-bold">
          T O D O
        </h1>

        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="text-gray-600 dark:text-gray-400"
        >
          {theme === "light" ? 
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26">
            <path fill="#FFF" fillRule="evenodd" d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"/>
          </svg> : 
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26">
            <path fill="#FFF" fillRule="evenodd" d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"/>
          </svg>
          }
        </button>
      </header>

      <main className="px-4 md:px-12 py-4 dark:bg-gray-900 relative">
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
            placeholder="Añade una nueva tarea..."
            className="w-full rounded-md border border-gray-200 dark:border-gray-700 px-4 py-2 focus:outline-none focus:border-blue-400 dark:bg-gray-800 dark:text-gray-100"
          />
        </form>
        
        <ul className="mt-4 shadow-xl rounded-md">
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
        </ul>
        <div className="flex flex-col md:flex-row justify-between items-center mt-4">
          <div className="text-sm md:text-base text-gray-500">
            {todos.filter((todo) => !todo.completed).length} tareas pendientes
          </div>
          <div className="bg-white p-4 md:bg-none flex space-x-2 rounded-md dark:bg-gray-800">
            <button
              onClick={() => setFilter("all")}
              className={`text-sm md:text-base ${
                filter === "all" ? "font-bold text-blue-500" : "text-gray-500"
              } hover:text-black`}
            >
              Todas las tareas
            </button>
            <button
              onClick={() => setFilter("active")}
              className={`text-sm md:text-base ${
                filter === "active" ? "font-bold text-blue-500" : "text-gray-500"
              } hover:text-black`}
            >
              Tareas activas
            </button>
            <button
              onClick={() => setFilter("complete")}
              className={`text-sm md:text-base ${
                filter === "complete" ? "font-bold text-blue-500" : "text-gray-500"
              } hover:text-black`}
            >
              Tareas completadas
            </button>
          </div>
          <button
            onClick={clearCompleted}
            className="text-sm md:text-base text-gray-500 hover:text-red-500"
          >
            Eliminar tareas completadas
          </button>
        </div>
      </main>
    </div>
  );
}

export default App
