import api from "./api";

export const getColumns = async () => {
  try {
    const response = await api.get("/columns");
    return response.data;
  } catch (error) {
    console.error("Error al obtener las columnas:", error);
    return [];
  }
};

export const createColumn = async (column) => {
  try {
    const response = await api.post("/columns", column);
    return response.data;
  } catch (error) {
    console.error("Error al crear la columna:", error);
    return null;
  }
};

export const updateColumn = async (columnId, column) => {
  try {
    const response = await api.put(`/columns/${columnId}`, column);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar la columna:", error);
    return null;
  }
};

export const deleteColumn = async (columnId) => {
  try {
    const response = await api.delete(`/columns/${columnId}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar la columna:", error);
    return null;
  }
};
