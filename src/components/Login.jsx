import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://api-rest-kanban-b952.onrender.com/api/login",
        formData
      );
      alert("Login exitoso!");
      console.log(response.data);
    } catch (error) {
      alert(
        `Error: ${error.response?.data?.message || "Error al iniciar sesión"}`
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r p-4 sm:p-8">
      <div className="bg-white p-8 rounded-md  w-full max-w-md ">
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
            Dont have an account?{" "}
            <Link to="/" className="text-black font-bold hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
