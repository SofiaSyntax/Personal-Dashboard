import { useState, useEffect } from "react";
import Weather from "./components/Weather";
import TodoList from "./components/TodoList";
import Notes from "./components/Notes";



import "./index.css"; 

export default function App() {
  const [time, setTime] = useState(new Date());

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white font-sans">
      {/* Top Navbar */}
      <header className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-700 bg-gray-900/40 backdrop-blur-lg">
        <h1 className="text-3xl font-extrabold tracking-tight">Personal Dashboard</h1>
        <p className="text-gray-400 font-mono mt-2 sm:mt-0">
          {time.toLocaleDateString()} • {time.toLocaleTimeString()}
        </p>
      </header>
      

      {/* Widgets Grid */}
      <main className="p-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Weather Widget */}
        <div className="bg-gray-800/70 p-5 rounded-2xl shadow-lg hover:shadow-xl transition backdrop-blur-md border border-gray-700/50">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            Weather
          </h2>
          <Weather />
        </div>

        {/* To-Do Widget */}
        <div className="bg-gray-800/70 p-5 rounded-2xl shadow-lg hover:shadow-xl transition backdrop-blur-md border border-gray-700/50">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            To-Do List
          </h2>
          <TodoList />
        </div>

        {/* Notes Widget */}
        <div className="bg-gray-800/70 p-5 rounded-2xl shadow-lg hover:shadow-xl transition backdrop-blur-md border border-gray-700/50">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            Notes
          </h2>
          <Notes />
        </div>
      </main>
    </div>
  );
}


