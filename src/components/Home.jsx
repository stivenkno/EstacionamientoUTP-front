import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useColumns } from "../hooks/useColumns";
import { useTasks } from "../hooks/useTasks";

export default function Home() {
  const [username, setUsername] = useState("");

  const { columns, addColumn, removeColumn } = useColumns();
  const { tasks, addTask, removeTask } = useTasks();
  console.log(columns);
  console.log(tasks);

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    if (userName) {
      setUsername(userName);
    }
  }, []);

  return (
    <div className="h-screen flex bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 space-y-6 flex-shrink-0">
        <h1 className="text-2xl font-bold">Connetiz</h1>
        <nav className="space-y-4">
          {[
            "📊 Dashboard",
            "🤖 Chat Bot",
            "👤 User",
            "🧑 Employee",
            "📁 Profile",
            "📦 Kanban",
            "🔑 Login",
          ].map((item, index) => (
            <a
              key={index}
              href="#"
              className="flex items-center space-x-2 text-gray-700 hover:text-black"
            >
              {item}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
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
        <div className="flex-1 p-6 bg-gradient-to-b from-gray-100 to-gray-300 overflow-auto">
          <div className="flex justify-between items-center text-3xl font-bold mb-2">
            <p>Kanban</p>
            <button className="text-gray-500 hover:text-black text-lg border-2 rounded-full px-4 py-1">
              + Add new Task
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Manage tasks by drag and drop (dnd)
          </p>

          {/* Board Container */}
          <div className="flex flex-nowrap overflow-x-auto space-x-6 max-w-full p-2">
            {/* Column: Todo */}
            {columns.map((column) => (
              <div
                id={column.column_id}
                key={column.column_id}
                className="w-64 bg-white rounded-lg shadow-md p-4 flex-shrink-0"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">{column.title}</h3>
                  <button className="text-gray-500 hover:text-black">⋮</button>
                </div>

                {/* Tasks */}
                {tasks
                  .filter((task) => task.column_id === column.column_id)
                  .map((task) => (
                    <div
                      key={task.task_id}
                      className="bg-gray-200 rounded-lg p-2 mb-2"
                    >
                      <p className="font-semibold border-b-2 border-slate-400">
                        {task.title}
                      </p>
                      <p>{task.description}</p>
                      <div className="flex justify-end space-x-2">
                        <button className="text-gray-500 hover:text-black">
                          ✏️
                        </button>
                        <button
                          onClick={() => removeTask(task.task_id)}
                          className="text-gray-500 hover:text-black"
                        >
                          🗑
                        </button>
                        ️
                      </div>
                    </div>
                  ))}
                <p className="text-center text-gray-500">+ Add New Task</p>
              </div>
            ))}

            {/* Add New Section */}
            <button
              onClick={addColumn}
              className="w-64 h-20 bg-gray-200 text-center rounded-lg flex-shrink-0"
            >
              + Add New Section
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
