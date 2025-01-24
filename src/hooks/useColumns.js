import { useState, useEffect } from "react";
import {
  getColumns,
  createColumn,
  deleteColumn,
  updateAllColumns,
} from "../services/columnService";

export const useColumns = () => {
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    async function fetchColumns() {
      const data = await getColumns();
      setColumns(data);
    }
    fetchColumns();
  }, []);

  const updateAlColumns = async (columns) => {
    const response = await updateAllColumns(columns);
    console.log(response, "response");
  };
  const addColumn = async (title) => {
    if (!title) return; // Evita columnas con título vacío
    const position = columns.length + 1; // Calcula la posición de la nueva columna
    await createColumn({ title, position });

    async function fetchColumns() {
      const data = await getColumns();
      console.log(data, "data");
      setColumns(data);
    }
    fetchColumns();

    return columns;
  };

  const removeColumn = async (id) => {
    await deleteColumn(id);
    setColumns((prevColumns) =>
      prevColumns.filter((column) => column.column_id !== id)
    );
  };

  return {
    columns,
    addColumn,
    removeColumn,
    setColumns,
    getColumns,
    updateAlColumns,
  };
};
