import { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useParams } from "react-router-dom";
import { useParking } from "../contexts/ParkingContext";
import apiInstance from "../services/api";

const QR = () => {
  const { parkings, setParkings } = useParking();
  const { park } = useParams();
  const [qrData, setQrData] = useState("");
  const scannerRef = useRef(null);
  const scannerInstance = useRef(null);
  // Ref para mantener el valor actualizado de parkings
  const parkingsRef = useRef(parkings);
  useEffect(() => {
    parkingsRef.current = parkings;
  }, [parkings]);

  const logicpark = (currentParkings) => {
    if (park == 1) {
      return currentParkings.parkuno[0]?.id_park_1;
    } else if (park == 2) {
      return currentParkings.parkdos[0]?.id_park_2;
    } else if (park == 3) {
      return currentParkings.parktres[0]?.id_park_3;
    } else if (park == 4) {
      return currentParkings.parkcuatro[0]?.id_park_4;
    }
  };

  const updatePark = async (decodedText) => {
    try {
      // Usar el valor actualizado de parkings desde el ref
      const currentParkings = parkingsRef.current;

      const parkId = logicpark(currentParkings);
      if (!parkId) {
        alert("No hay parqueaderos disponibles.");
        return;
      }

      const response = await apiInstance.put(`/updatepark`, {
        park_id: parkId,
        estado: "ocupado",
        park,
      });
      console.log("Respuesta del servidor:", response.data);
      alert("Parqueadero actualizado correctamente.");
      if (park == 1) {
        // Eliminar el primer elemento del arreglo
        setParkings((prev) => ({
          ...prev,
          parkuno: prev.parkuno.slice(1),
        }));
      } else if (park == 2) {
        // Eliminar el primer elemento del arreglo
        setParkings((prev) => ({
          ...prev,
          parkdos: prev.parkdos.slice(1),
        }));
      } else if (park == 3) {
        // Eliminar el primer elemento del arreglo
        setParkings((prev) => ({
          ...prev,
          parktres: prev.parktres.slice(1),
        }));
      } else if (park == 4) {
        // Eliminar el primer elemento del arreglo
        setParkings((prev) => ({
          ...prev,
          parkcuatro: prev.parkcuatro.slice(1),
        }));
      }
    } catch (error) {
      console.error("Error al actualizar el parque:", error);
    }
  };

  useEffect(() => {
    // Crear el scanner una sola vez al montar el componente
    scannerInstance.current = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: 350,
    });

    scannerInstance.current.render(async (decodedText) => {
      setQrData(decodedText);
      console.log("Código Escaneado:", decodedText);
      alert(`Código Escaneado: ${decodedText}`);

      await updatePark(decodedText);

      // Reanudar el escaneo después de un breve retraso (en caso de que el scanner se pause internamente)
      setTimeout(() => {
        scannerInstance.current.resume();
      }, 1000);
    });

    // Limpiar la instancia cuando se desmonte el componente
    return () => {
      if (scannerInstance.current) {
        scannerInstance.current.clear();
      }
    };
  }, []); // Se ejecuta solo una vez

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div id="reader" ref={scannerRef}></div>
    </div>
  );
};

export default QR;
