import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import apiInstance from "../services/api";

export default function EditProfile() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await apiInstance.get("/profile");
        setUser(response.data);
      } catch (error) {
        console.error("Error al obtener el perfil:", error);
      }
    }
    fetchUser();
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Cargando...
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Botón de menú en móviles */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden p-3 bg-blue-700 text-white rounded-md shadow-md"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? "✖" : "☰"}
      </button>

      {/* Navbar lateral */}
      <nav
        className={`fixed inset-y-0 left-0 w-64 bg-blue-700 text-white flex flex-col items-center py-8 transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:flex`}
      >
        <h1 className="text-2xl font-bold mb-8">🚗 Parking App</h1>
        <ul className="space-y-4 w-full text-center">
          <li>
            <Link
              to="/home"
              className="block py-3 text-lg hover:bg-blue-600 rounded-md transition"
              onClick={() => setMenuOpen(false)}
            >
              🏠 Inicio
            </Link>
          </li>
          <li>
            <Link
              to="/QR"
              className="block py-3 text-lg hover:bg-blue-600 rounded-md transition"
              onClick={() => setMenuOpen(false)}
            >
              🎟️ Generar QR
            </Link>
          </li>
        </ul>
      </nav>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col  p-6">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg mt-10 flex flex-col md:flex-row gap-8 p-6">
          {/* Datos del usuario */}
          <div className="w-full md:w-1/2">
            <h1 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">
              Información Personal
            </h1>
            <div className="space-y-4 text-lg">
              <p className="text-gray-700">
                <span className="font-semibold">👤 Nombre:</span>{" "}
                {user.username}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">📧 Correo Electrónico:</span>{" "}
                {user.email}
              </p>
            </div>
          </div>

          {/* Sección QR */}
          <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-gray-50 p-6 rounded-lg border">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Código QR
            </h2>
            <QRCode value={JSON.stringify(user)} size={180} />
            <p className="text-sm text-gray-500 mt-2">
              Escanea para Solicitar un Cupo
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
