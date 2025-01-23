import { useState, useEffect } from "react";
import {
  reorderColumns,
  getOrderColumns,
} from "../services/reorderColumnsService";

export const useOrderColumns = () => {
  const [columnOrder, setColumnOrder] = useState([]);

  useEffect(() => {
    async function fetchColumnOrder() {
      const data = await getOrderColumns();
      setColumnOrder(data);
    }
    fetchColumnOrder();
  }, []);
  const updateColumnOrder = async (columnOrder) => {
    await reorderColumns(columnOrder);
    setColumnOrder(columnOrder);
  };
  return { columnOrder, updateColumnOrder, setColumnOrder };
};
