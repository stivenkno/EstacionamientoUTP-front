import { Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { useColumns } from "../hooks/useColumns";
import { useTasks } from "../hooks/useTasks";
import { useOrderColumns } from "../hooks/useOrderColumns";
import ColumnContainer from "./ColumnContainer";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

export default function Home() {
  const [username, setUsername] = useState("");
  const { columns, addColumn, removeColumn, setColumns } = useColumns();
  const { columnOrder, updateColumnOrder, setColumnOrder } = useOrderColumns();

  const { tasks, addTask, removeTask } = useTasks();

  const columnsId = useMemo(
    () => columns.map((column) => column.column_id),
    [columns]
  );

  const [activeColumn, setActiveColumn] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

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
          <Link
            to="/home"
            className="flex items-center text-gray-700 hover:text-black"
          >
            📊 Home
          </Link>

          <Link
            to="/profile"
            className="flex items-center text-gray-700 hover:text-black"
          >
            📁 Profile
          </Link>

          <Link
            to="/login"
            className="flex items-center text-gray-700 hover:text-black"
          >
            🔑 Login
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <nav className="bg-white shadow p-4 flex justify-between items-center">
          <span className="text-lg font-semibold">Dashboard &gt; Kanban</span>
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-black">⚙️</button>
            <button className="text-gray-500 hover:text-black ">
              {username}
            </button>
          </div>
        </nav>

        {/* Kanban Board */}
        <div className="flex-1 p-6 bg-gradient-to-b from-gray-100 to-gray-300 overflow-auto">
          <div className="flex justify-between items-center text-3xl font-bold mb-2">
            <p>Kanban</p>
            {/* Add New Section */}
            <button
              onClick={() => {
                const newColumn = prompt("Enter a title for the new section:");
                addColumn(newColumn);
                console.log(columns);
              }}
              className="px-4 py-2 bg-gray-200 text-center rounded-lg flex-shrink-0 text-2xl"
            >
              + Add New Section
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Manage tasks by drag and drop (dnd)
          </p>

          <DndContext
            sensors={sensors}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
          >
            <div className="flex gap-4 p-4 overflow-x-auto overflow-y-hidden">
              <SortableContext items={columnsId}>
                {columns.map((column) => (
                  <ColumnContainer
                    column={column}
                    tasks={tasks}
                    key={column.column_id}
                  />
                ))}
              </SortableContext>
            </div>

            {createPortal(
              <DragOverlay>
                {activeColumn && <ColumnContainer column={activeColumn} />}
              </DragOverlay>,
              document.body
            )}
          </DndContext>
        </div>
      </div>
    </div>
  );

  function onDragStart(event) {
    console.log("onDragStart", event);
    const { active } = event;
    const activeColumn = columns.find(
      (column) => column.column_id === active.id
    );
    setActiveColumn(activeColumn || null);
  }

  async function onDragEnd(event) {
    console.log("onDragEnd", event);
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = columns.findIndex(
      (column) => column.column_id === active.id
    );
    const newIndex = columns.findIndex(
      (column) => column.column_id === over.id
    );

    // Actualiza el orden de las columnas en el estado local
    setColumns((prevColumns) => arrayMove(prevColumns, oldIndex, newIndex));
  }
}
