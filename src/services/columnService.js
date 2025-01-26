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
export const updateAllColumns = async (columns) => {
  try {
    const response = await api.post("/columns/updatecolumn", {
      data: columns,
    });
    const response2 = await api.get("/columns");
    return response2.data;
  } catch (error) {
    console.error("Error al actualizar las columnas:", error);
    return null;
  }
};

export const deleteColumn = async (columnId) => {
  try {
    const response = await api.delete(`/columns`, {
      data: { column_id: columnId },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar la columna:", error);
    return null;
  }
};
