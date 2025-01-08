import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Home() {
  const [username, setUsername] = useState("John Doe");

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    if (userName) {
      setUsername(userName);
    }
  }, []);
  return (
    <div className="h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 space-y-6">
        <h1 className="text-2xl font-bold">Connetiz</h1>
        <nav className="space-y-4">
          <a
            href="#"
            className="flex items-center space-x-2 text-gray-700 hover:text-black"
          >
            📊 Dashboard
          </a>
          <a
            href="#"
            className="flex items-center space-x-2 text-gray-700 hover:text-black"
          >
            🤖 Chat Bot
          </a>
          <a
            href="#"
            className="flex items-center space-x-2 text-gray-700 hover:text-black"
          >
            👤 User
          </a>
          <a
            href="#"
            className="flex items-center space-x-2 text-gray-700 hover:text-black"
          >
            🧑 Employee
          </a>
          <a
            href="#"
            className="flex items-center space-x-2 text-gray-700 hover:text-black"
          >
            📁 Profile
          </a>
          <a
            href="#"
            className="flex items-center space-x-2 text-gray-700 hover:text-black"
          >
            📦 Kanban
          </a>
          <a
            href="#"
            className="flex items-center space-x-2 text-gray-700 hover:text-black"
          >
            🔑 Login
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <nav className="bg-white shadow p-4 flex justify-between items-center">
          <span className="text-lg font-semibold">Dashboard &gt; Kanban</span>
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-black">⚙️</button>
            <button className="text-gray-500 hover:text-black">
              {username}
            </button>
          </div>
        </nav>

        {/* Kanban Board */}
        <div className="flex-1 p-6 bg-gradient-to-b from-gray-100 to-gray-300">
          <div className="flex justify-between items-center text-3xl font-bold mb-2">
            <p>Kanban</p>
            <button className="text-gray-500 hover:text-black text-lg  border-2 rounded-full px-4 py-1">
              + Add new Task
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Manage tasks by drag and drop (dnd)
          </p>

          {/* Board Container */}
          <div className="flex space-x-6">
            {/* Column: Todo */}
            <div className="w-64 bg-white rounded-lg shadow-md p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Todo</h3>
                <button className="text-gray-500 hover:text-black">⋮</button>
              </div>
              <p className="text-center text-gray-500">+ Add New Task</p>
            </div>

            {/* Add New Section */}
            <button className="w-64 h-20 bg-gray-200 text-center rounded-lg">
              + Add New Section
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
