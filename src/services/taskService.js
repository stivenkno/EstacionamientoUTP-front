import api from "./api";

export const getTasks = async () => {
  try {
    const response = await api.get("/tasks");
    return response.data;
  } catch (error) {
    console.error("Error al obtener las tareas:", error);
    return [];
  }
};

export const createTask = async (task) => {
  try {
    const response = await api.post("/tasks", task);
    return response.data;
  } catch (error) {
    console.error("Error al crear la tarea:", error);
    return null;
  }
};

export const updateTask = async (taskId, task) => {
  try {
    const response = await api.put(`/tasks/${taskId}`, task);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar la tarea:", error);
    return null;
  }
};

export const deleteTask = async (taskId) => {
  try {
    const response = await api.delete(`/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar la tarea:", error);
    return null;
  }
};
