/* eslint-disable react/prop-types */
function TodoItem({ todo, toggleComplete, deleteTodo }) {
  return (
<article className="bg-white dark:bg-gray-800 flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
      <li
        onClick={() => toggleComplete(todo.id)}
        className={`flex items-center space-x-2 cursor-pointer gap-3 ${todo.completed ? "line-through text-gray-400" : ""}`}
      >
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleComplete(todo.id)}
          className="form-checkbox h-5 w-5 text-blue-500 rounded"
        />

        <span className="text-balance dark:dark:text-gray-400">
          {todo.text}
        </span>

      </li>
      <button
        onClick={() => deleteTodo(todo.id)}
        className="text-red-500 hover:text-red-700 font-bold"
      >
        X
      </button>
    </article>
  )
}

export default TodoItem