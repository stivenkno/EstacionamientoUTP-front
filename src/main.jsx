import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./input.css";
import App from "./App.jsx";
import { ParkingProvider } from "./contexts/ParkingContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ParkingProvider>
      <App />
    </ParkingProvider>
  </BrowserRouter>
);
