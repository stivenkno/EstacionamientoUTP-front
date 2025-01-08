import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = await axios.post(
        "https://api-rest-kanban-b952.onrender.com/api/register",
        formData
      );
      alert("Registro exitoso!", response.data);
    } catch (error) {
      alert(
        `Error: ${error.response?.data?.message || "Error al registrarse"}`
      );
    }
  };

  return (
    <>
      <nav className="bg-black text-white p-4 flex justify-between">
        <Link to="/" className="text-xl font-bold">
          Kanban App
        </Link>
      </nav>
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-r  to-black p-4 sm:p-8">
        <div className="bg-white p-8 rounded-md  w-full max-w-md  ">
          <h2 className="text-3xl font-bold text-center text-black mb-8">
            Create an account
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black"
              onChange={handleChange}
              value={formData.name}
            />
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
              Create account
            </button>
            <p className="text-center">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-black font-semibold hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
