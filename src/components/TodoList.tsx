import { useState, useEffect, FormEvent } from "react";
import { Trash } from "lucide-react";


interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoList() {
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState("");

  // Load tasks from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    if (stored) setTasks(JSON.parse(stored));
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e: FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setTasks([
      ...tasks,
      { id: Date.now(), text: newTask.trim(), completed: false },
    ]);
    setNewTask("");
  };

  const toggleComplete = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="bg-gray-800 p-4 rounded-2xl shadow">
      <form onSubmit={addTask} className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a task..."
          className="flex-1 p-2 rounded bg-gray-700 text-white focus:outline-none"
        />
        <button
          type="submit"
          className="bg-purple-500 px-4 py-2 rounded font-bold hover:bg-purple-600"
        >
          Add
        </button>
      </form>

      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-center mb-2 p-2 rounded bg-gray-700"
          >
            <span
              onClick={() => toggleComplete(task.id)}
              className={`flex-1 cursor-pointer ${
                task.completed ? "line-through text-gray-400" : ""
              }`}
            >
              {task.text}
            </span>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-white hover:text-red-400 font-bold"
            >
              <Trash className="w-5 h-5" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
