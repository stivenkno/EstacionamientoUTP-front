import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import apiInstance from "../services/api";

export default function EditProfile() {
  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

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
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiInstance.put("/editprofile", {
        username: name,
        email: email,
      });
      setUser(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
    }
  };

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
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg h-screen w-screen m-[100px]">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">
            Editar Perfil
          </h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Guardar Cambios
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
