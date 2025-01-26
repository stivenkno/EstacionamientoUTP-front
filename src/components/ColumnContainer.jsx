// ColumnContainer.jsx
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { deleteColumn } from "../services/columnService";

export default function ColumnContainer(props) {
  const { column, tasks, removeColumn } = props;

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.column_id,
    data: {
      type: "COLUMN",
      column,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex flex-col bg-gray-800 min-w-64 min-h-96 p-2 rounded-[6px] gap-1 text-white ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div
        {...attributes}
        {...listeners}
        className="flex font-bold justify-between bg-slate-600 px-4 py-2 text-center rounded-[6px] cursor-grab gap-2"
      >
        {column.title}
        <button
          onClick={() => removeColumn(column.column_id)}
          className="bg-red-600 hover:bg-red-700 font-bold px-2 rounded"
        >
          DELETE
        </button>
      </div>

      {Array.isArray(tasks) &&
        tasks
          .filter((task) => task.column_id === column.column_id)
          .map((task) => (
            <div key={task.id} className="p-4 bg-slate-400 rounded-lg">
              {task.title}
            </div>
          ))}

      <button className="bg-blue-300 hover:bg-blue-700 font-bold py-2 px-4 rounded mt-2">
        Add Task
      </button>
    </div>
  );
}
