import { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const Administrador = () => {
  const [qrData, setQrData] = useState("");
  const scannerRef = useRef(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 });

    scanner.render(
      (decodedText) => {
        setQrData(decodedText);
        scanner.clear();
      },
      (error) => console.error(error)
    );

    return () => scanner.clear();
  }, []);

  return (
    <div>
      <div id="reader" ref={scannerRef}></div>
      <p>QR: {qrData}</p>
    </div>
  );
};

export default Administrador;
