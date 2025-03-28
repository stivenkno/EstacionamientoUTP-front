import { Routes, Route } from "react-router-dom";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Home from "./components/Home.jsx";
import Administrador from "./components/Administrador.jsx";
import { Toaster } from "react-hot-toast";

import EditProfile from "./components/EditProfile.jsx";
import QR from "./components/QR.jsx";

export default function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/QR" element={<EditProfile />} />
        <Route path="/admin/:park" element={<Administrador />} />
        <Route path="/admin/:park/QR" element={<QR />} />
      </Routes>
    </>
  );
}
