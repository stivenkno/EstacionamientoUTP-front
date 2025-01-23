import { useState, useEffect } from "react";
import {
  getColumns,
  createColumn,
  deleteColumn,
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

  const addColumn = async (title) => {
    if (!title) return; // Evita columnas con título vacío
    const position = columns.length + 1; // Calcula la posición de la nueva columna
    const newColumn = await createColumn({ title, position });
    setColumns([...columns, newColumn]); // Actualiza el estado
  };

  const removeColumn = async (id) => {
    await deleteColumn(id);
    setColumns((prevColumns) =>
      prevColumns.filter((column) => column.column_id !== id)
    );
  };

  return { columns, addColumn, removeColumn, setColumns };
};
