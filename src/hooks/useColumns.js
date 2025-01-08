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
    const newColumn = await createColumn(title);
    setColumns([...columns, newColumn]);
  };

  const removeColumn = async (id) => {
    await deleteColumn(id);
    setColumns(columns.filter((column) => column.id !== id));
  };

  return { columns, addColumn, removeColumn };
};
