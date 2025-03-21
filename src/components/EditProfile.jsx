import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import apiInstance from "../services/api";
import { IoHomeSharp } from "react-icons/io5";
import { BiQrScan } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

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
      <div className="flex-1 flex flex-col  p-6 flex items-center justify-center">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg mt-10 flex flex-col md:flex-row gap-8 p-6">
          {/* Datos del usuario */}
          <div className="w-full md:w-1/2">
            <h1 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">
              INFORMACION PERSONAL
            </h1>
            <div className="space-y-4 text-lg">
              <p className="text-gray-700 flex flex-col gap-2">
                <span className="font-semibold flex gap-2 items-center">
                  <FaUser /> Nombre:
                </span>{" "}
                {user.username}
              </p>
              <p className="text-gray-700 flex flex-col gap-2">
                <span className="font-semibold flex gap-2 items-center">
                  <MdOutlineEmail /> Correo Electrónico:
                </span>{" "}
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
