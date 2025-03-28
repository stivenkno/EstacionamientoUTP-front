import { useParking } from "../contexts/ParkingContext";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import apiInstance from "../services/api";
import { IoHomeSharp } from "react-icons/io5";
import { BiQrScan } from "react-icons/bi";

export default function Home() {
  const { parkings, setParkings } = useParking();
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedParking, setSelectedParking] = useState(null);

  const getParks = async () => {
    try {
      const response = await apiInstance.get(
        "https://estacionamientoutp.onrender.com/api/parks"
      );
      setParkings(response.data || {});
    } catch (error) {
      console.error("Error al obtener los parques:", error);
      setParkings({ parkuno: [], parkdos: [], parktres: [], parkcuatro: [] });
    }
  };

  useEffect(() => {
    getParks();
  }, []);

  const openModal = (parkName, occupiedSpaces) => {
    setSelectedParking({ name: parkName, occupiedSpaces });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedParking(null);
  };

  const textColors = [
    "text-blue-300",
    "text-green-300",
    "text-yellow-300",
    "text-red-300",
  ];

  return (
    <div className="h-screen flex flex-col md:flex-row bg-gray-100 ">
      <button
        className="fixed top-4 left-4 z-50 md:hidden p-3 bg-black text-white rounded-md shadow-md"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? "✖" : "☰"}
      </button>

      <nav
        className={`fixed inset-y-0 left-0 w-64 bg-black text-white flex flex-col items-center py-8 transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:flex z-10 shadow-lg`}
      >
        <h1 className="text-2xl font-bold mb-8">Parking App</h1>
        <ul className="space-y-4 w-full text-center">
          <li>
            <Link
              to="/home"
              className="flex items-center justify-center gap-2 py-3 text-lg hover:bg-blue-600 rounded-md transition"
            >
              <IoHomeSharp className="w-5 h-5" /> Inicio
            </Link>
          </li>
          <li>
            <Link
              to="/QR"
              className="flex items-center justify-center gap-2 py-3 text-lg hover:bg-blue-600 rounded-md transition"
            >
              <BiQrScan className="w-5 h-5" /> Ver QR
            </Link>
          </li>
        </ul>
      </nav>

      <div className="flex-1 flex flex-col p-6 items-center justify-center w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          🚗 CUPOS DISPONIBLES
        </h1>

        <button
          className="bg-black hover:bg-gray-500 text-white py-2 px-4 rounded-md mb-4"
          onClick={getParks}
        >
          ACTUALIZAR
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl cursor-pointer">
          {["parkuno", "parkdos", "parktres", "parkcuatro"].map(
            (key, index) => {
              const occupiedSpaces = parkings?.[key]?.length || 0;
              return (
                <div
                  key={index}
                  className="relative bg-gray-900 bg-opacity-80 shadow-lg rounded-xl p-6 text-center border-b-4 border-blue-500 border-opacity-50 hover:border-opacity-100 hover:shadow-blue-500/50 hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-1 cursor-pointer"
                  onClick={() => openModal(`Park ${index + 1}`, occupiedSpaces)}
                >
                  <h2
                    className={`text-lg font-semibold tracking-wide text-white`}
                  >
                    Park {index + 1}
                  </h2>
                  <p
                    className={`text-5xl font-extrabold mt-2 text-white ${textColors[index]}`}
                  >
                    {occupiedSpaces}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    Cupos disponibles
                  </p>
                </div>
              );
            }
          )}
        </div>
      </div>

      {modalOpen && selectedParking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl overflow-auto max-h-[90vh]">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {selectedParking.name} - Puestos
            </h2>
            <button
              className="mt-4 bg-black hover:bg-gray-500 text-white py-2 px-4 rounded-md w-full"
              onClick={closeModal}
            >
              CERRAR
            </button>
            <div className="grid grid-cols-10 grid-rows-20 gap-2 p-4">
              {Array.from({ length: 200 }, (_, i) => (
                <div
                  key={i}
                  className={`w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-md text-center text-white ${
                    i < 200 - selectedParking.occupiedSpaces
                      ? "bg-red-500"
                      : "bg-blue-500"
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
