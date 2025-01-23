import api from "./api";

const getOrderColumns = async () => {
  try {
    const response = await api.get("/columns/columns");
    return response.data;
  } catch (error) {
    console.error("Error al obtener el orden de las columnas:", error);
    return null;
  }
};
const reorderColumns = async (columnOrder) => {
  try {
    const response = await api.post("/columns/reorder", {
      data: columnOrder,
    });
    return response.data;
  } catch (error) {
    console.error("Error al reordenar las columnas:", error);
    return null;
  }
};

export { getOrderColumns, reorderColumns };
