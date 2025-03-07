import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import apiInstance from "../services/api";

export default function Profile() {
  const [user, setUser] = useState({});

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await apiInstance.get("/profile");
        setUser(response.data);
        console.log(user);
      } catch (error) {
        console.error("Error al obtener el perfil:", error);
      }
    }
    fetchUser();
  }, []);

  return (
    <div className="h-screen flex bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 space-y-6 flex-shrink-0">
        <h1 className="text-2xl font-bold">Connetiz</h1>
        <nav className="space-y-4">
          <Link
            to="/home"
            className="flex items-center text-gray-700 hover:text-black"
          >
            📊 Home
          </Link>

          <Link
            to="/profile"
            className="flex items-center text-gray-700 hover:text-black"
          >
            📁 Profile
          </Link>

          <Link
            to="/login"
            className="flex items-center text-gray-700 hover:text-black"
          >
            🔑 Login
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <nav className="bg-white shadow p-4 flex justify-between items-center">
          <span className="text-lg font-semibold">Dashboard &gt; Kanban</span>
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-black">⚙️</button>
            <button className="text-gray-500 hover:text-black ">
              {user.username}
            </button>
          </div>
        </nav>

        <div className="flex max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl w-full h-full m-5 flex-col justify-around items-center">
          <div className="flex items-center space-x-6">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden border-2 border-blue-500">
              <img
                src={user.avatar || "https://via.placeholder.com/150"} // Placeholder si no hay avatar
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </div>

            {/* User Details */}
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {user.username || "Nombre de Usuario"}
              </h1>
              <p className="text-gray-600">
                <strong>Email:</strong> {user.email || "example@example.com"}
              </p>
              <p className="text-gray-600">
                <strong>Miembro desde:</strong>{" "}
                {user.created_at
                  ? new Date(user.created_at).toLocaleDateString()
                  : "Fecha no disponible"}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex justify-center">
            <Link
              to="/editprofile"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
            >
              Editar Perfil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
