import { useParking } from "../contexts/ParkingContext";
import { Link } from "react-router-dom";

export default function Home() {
  const { parkings } = useParking();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Navbar Vertical */}
      <nav className="w-64 bg-blue-700 text-white flex flex-col items-center py-8 fixed h-full">
        <h1 className="text-2xl font-bold mb-8">🚗 Parking App</h1>
        <ul className="space-y-4 w-full text-center">
          <li>
            <Link
              to="/"
              className="block py-3 text-lg hover:bg-blue-600 rounded-md transition"
            >
              🏠 Inicio
            </Link>
          </li>
          <li>
            <Link
              to="/generar-qr"
              className="block py-3 text-lg hover:bg-blue-600 rounded-md transition"
            >
              🎟️ Generar QR
            </Link>
          </li>
        </ul>
      </nav>

      {/* Contenido principal */}
      <div className="flex-1 ml-64 p-6 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          🚗 CUPOS DISPONIBLES
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl">
          <div className="bg-white shadow-md rounded-lg p-6 text-center border-t-4 border-blue-500">
            <h2 className="text-lg font-semibold text-gray-700">Park Uno</h2>
            <p className="text-4xl font-bold text-blue-600 mt-2">
              {parkings?.parkuno?.length || 0}
            </p>
            <p className="text-sm text-gray-500">Cupos disponibles</p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 text-center border-t-4 border-green-500">
            <h2 className="text-lg font-semibold text-gray-700">Park Dos</h2>
            <p className="text-4xl font-bold text-green-600 mt-2">
              {parkings?.parkdos?.length || 0}
            </p>
            <p className="text-sm text-gray-500">Cupos disponibles</p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 text-center border-t-4 border-yellow-500">
            <h2 className="text-lg font-semibold text-gray-700">Park Tres</h2>
            <p className="text-4xl font-bold text-yellow-600 mt-2">
              {parkings?.parktres?.length || 0}
            </p>
            <p className="text-sm text-gray-500">Cupos disponibles</p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 text-center border-t-4 border-red-500">
            <h2 className="text-lg font-semibold text-gray-700">Park Cuatro</h2>
            <p className="text-4xl font-bold text-red-600 mt-2">
              {parkings?.parkcuatro?.length || 0}
            </p>
            <p className="text-sm text-gray-500">Cupos disponibles</p>
          </div>
        </div>
      </div>
    </div>
  );
}
