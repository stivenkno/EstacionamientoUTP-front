import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setToken } from "../services/api";
import { toast } from "react-hot-toast";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        formData.email.includes("@utp.edu.co") ||
        formData.email === "admin@gmail.com" ||
        formData.email === "admin2@gmail.com" ||
        formData.email === "admin3@gmail.com" ||
        formData.email === "admin4@gmail.com"
      ) {
        // Instancia petición login
        const response = await axios.post(
          "https://estacionamientoutp.onrender.com/api/login",
          formData
        );

        if (response.status === 200) {
          const token = response.data.token;
          setToken(token);
          localStorage.setItem("token", token);
          localStorage.setItem("userName", response.data.user.username);

          toast.success("Login exitoso!");

          // Aquí va la información del usuario
          console.log(response.data);

          if (
            formData.email === "admin@gmail.com" &&
            formData.password === "admin"
          ) {
            navigate("/admin/1");
            return;
          }
          if (
            formData.email === "admin2@gmail.com" &&
            formData.password === "admin2"
          ) {
            navigate("/admin/2");
            return;
          }
          if (
            formData.email === "admin3@gmail.com" &&
            formData.password === "admin3"
          ) {
            navigate("/admin/3");
            return;
          }
          if (
            formData.email === "admin4@gmail.com" &&
            formData.password === "admin4"
          ) {
            navigate("/admin/4");
            return;
          }

          // Validar el token antes de navegar
          const validateToken = localStorage.getItem("token");
          if (validateToken) {
            navigate("/home");
          } else {
            console.log("No hay token.");
          }
        } else {
          console.error("Unexpected response:", response);
        }
      } else {
        toast.error("El correo no pertenece a la UTP");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al iniciar sesión");
    }
  };

  return (
    <>
      <nav className="bg-black text-white p-4 flex justify-between">
        <Link to="/" className="text-xl font-bold">
          PARK UTP
        </Link>
      </nav>
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-r">
        <div className="bg-white p-8 rounded-md w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-black mb-8">
            Sign In
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black"
              onChange={handleChange}
              value={formData.email}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black"
              onChange={handleChange}
              value={formData.password}
            />
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-all"
            >
              Sign In
            </button>
            <p className="text-center">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-black font-bold hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
