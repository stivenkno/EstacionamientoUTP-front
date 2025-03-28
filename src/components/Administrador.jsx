import { useNavigate, useParams } from "react-router-dom";

export default function Administrador() {
  const navigate = useNavigate();
  const { park } = useParams(); // Obtener el parámetro dinámico de la URL

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-sm">
        <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
          Opciones de Escaneo
        </h2>
        <div className="space-y-3">
          <button
            onClick={() => navigate(`/admin/${park}/QR`)}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow"
          >
            Escanear QR
          </button>
          <button
            onClick={() => navigate(`/admin/${park}/barcode`)}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow"
          >
            Escanear Código de Barras
          </button>
          <button
            onClick={() => navigate(`/admin/${park}/manual`)}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg shadow"
          >
            Ingresar Manualmente
          </button>
        </div>
      </div>
    </div>
  );
}
