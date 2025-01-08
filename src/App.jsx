import { Routes, Route, Link } from "react-router-dom";
import Auth from "./components/Auth";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
}
