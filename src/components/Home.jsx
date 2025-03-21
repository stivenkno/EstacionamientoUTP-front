import { useParking } from "../contexts/ParkingContext";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import apiInstance from "../services/api";
import { IoHomeSharp } from "react-icons/io5";
import { BiQrScan } from "react-icons/bi";

export default function Home() {
  const { parkings, setParkings } = useParking();
  const [menuOpen, setMenuOpen] = useState(false);

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

  // Mapeo de colores para evitar errores con Tailwind
  const colorClasses = {
    blue: "border-blue-500 text-blue-600",
    green: "border-green-500 text-green-600",
    yellow: "border-yellow-500 text-yellow-600",
    red: "border-red-500 text-red-600",
  };

  return (
    <div className="h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Botón de menú en móviles */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden p-3 bg-black text-white rounded-md shadow-md"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? "✖" : "☰"}
      </button>

      {/* Navbar lateral */}
      <nav
        className={`fixed inset-y-0 left-0 w-64 bg-black text-white flex flex-col items-center py-8 transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:flex`}
      >
        <h1 className="text-2xl font-bold mb-8"> Parking App</h1>
        <ul className="space-y-4 w-full text-center">
          <li>
            <Link
              to="/home"
              className="flex items-center justify-center gap-2 py-3 text-lg hover:bg-blue-600 rounded-md transition"
              onClick={() => setMenuOpen(false)}
            >
              <IoHomeSharp className="w-5 h-5" />
              Inicio
            </Link>
          </li>

          <li>
            <Link
              to="/QR"
              className="flex items-center justify-center gap-2 py-3 text-lg hover:bg-blue-600 rounded-md transition"
              onClick={() => setMenuOpen(false)}
            >
              <BiQrScan className="w-5 h-5" />
              Ver QR
            </Link>
          </li>
        </ul>
      </nav>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col p-6 items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          🚗 CUPOS DISPONIBLES
        </h1>

        <button
          className="bg-black hover:bg-gray-500 text-white py-2 px-4 rounded-md mb-4 relative right-0 -z-10"
          onClick={() => {
            window.location.reload();
          }}
        >
          ACTUALIZAR
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl">
          {[
            {
              name: "Park Uno",
              count: parkings?.parkuno?.length || 0,
              color: "blue",
            },
            {
              name: "Park Dos",
              count: parkings?.parkdos?.length || 0,
              color: "green",
            },
            {
              name: "Park Tres",
              count: parkings?.parktres?.length || 0,
              color: "yellow",
            },
            {
              name: "Park Cuatro",
              count: parkings?.parkcuatro?.length || 0,
              color: "red",
            },
          ].map((park, index) => (
            <div
              key={index}
              className={`bg-white shadow-md rounded-lg p-6 text-center border-t-4 ${
                colorClasses[park.color]
              }`}
            >
              <h2 className="text-lg font-semibold text-gray-700">
                {park.name}
              </h2>
              <p
                className={`text-4xl font-bold ${
                  colorClasses[park.color]
                } mt-2`}
              >
                {park.count}
              </p>
              <p className="text-sm text-gray-500">Cupos disponibles</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
