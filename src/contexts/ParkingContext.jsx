import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import apiInstance from "../services/api";

// 1️⃣ Crear el contexto
const ParkingContext = createContext();

// 2️⃣ Crear el proveedor del contexto
export const ParkingProvider = ({ children }) => {
  const [parkings, setParkings] = useState({});
  console.log(parkings);
  const getParks = async () => {
    try {
      const response = await apiInstance.get(
        "https://estacionamientoutp.onrender.com/api/parks"
      );
      setParkings(response.data);
    } catch (error) {
      console.error("Error al obtener los parques:", error);
    }
  };

  useEffect(() => {
    getParks();
  }, []);

  console.log(parkings);
  return (
    <ParkingContext.Provider value={{ parkings, setParkings }}>
      {children}
    </ParkingContext.Provider>
  );
};

// 3️⃣ Hook personalizado para usar el contexto
export const useParking = () => {
  return useContext(ParkingContext);
};
