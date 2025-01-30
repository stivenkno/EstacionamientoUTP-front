import { useState, useEffect } from "react";
import { getTasks, createTask, deleteTask } from "../services/taskService";

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchTasks() {
      const data = await getTasks();
      setTasks(data);
      console.log(data, "tasks"); // ✅ Verifica que se están obteniendo los datos
    }
    fetchTasks();
  }, []);

  console.log("Columnas actualizadas", tasks); // ✅ Verifica cada cambio en `tasks`

  const addTask = async (task) => {
    const newTask = await createTask(task);
    setTasks((prevTasks) => [...prevTasks, newTask]); // ✅ Ahora sí se agrega correctamente
  };

  const removeTask = async (id) => {
    await deleteTask(id);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id)); // ✅ Ahora sí se elimina correctamente
  };

  return { tasks, addTask, removeTask, setTasks };
};
