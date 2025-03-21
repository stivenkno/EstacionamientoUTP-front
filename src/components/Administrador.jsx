import { useEffect, useRef, useState } from "react";
import jsQR from "jsqr";

const Administrador = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [qrData, setQrData] = useState("");
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState("");

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }, // Usa la cámara trasera en móviles
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play(); // Reproducir video automáticamente
        setScanning(true);
        scanQRCode(); // Iniciar escaneo en tiempo real
      }
    } catch (err) {
      setError("No se pudo acceder a la cámara. Verifica los permisos.");
      console.error(err);
    }
  };

  const scanQRCode = () => {
    if (!scanning || !videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const scan = () => {
      if (!scanning) return;

      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);

      if (code) {
        setQrData(code.data);
        stopCamera();
      } else {
        requestAnimationFrame(scan);
      }
    };

    scan();
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
    setScanning(false);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-lg font-bold mb-4">
        Escáner QR Vista de Administrador
      </h2>

      {error && <p className="text-red-500">{error}</p>}

      {!scanning ? (
        <button
          onClick={startCamera}
          className="bg-blue-600  px-4 py-2 rounded-lg shadow-md"
        >
          Iniciar Escaneo
        </button>
      ) : (
        <div className="relative w-full max-w-md">
          <video
            ref={videoRef}
            className="w-full h-auto rounded-lg shadow-md"
            autoPlay
            playsInline
          />
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full opacity-0"
          />
        </div>
      )}

      {qrData && (
        <p className="mt-4 text-green-600">Código Escaneado: {qrData}</p>
      )}
    </div>
  );
};

export default Administrador;
