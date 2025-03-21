import { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const Administrador = () => {
  const [qrData, setQrData] = useState("");
  const scannerRef = useRef(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 350 });
    console.log(scanner);

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
    <div className="w-screen h-screen flex items-center justify-center">
      <div id="reader" ref={scannerRef}></div>
    </div>
  );
};

export default Administrador;
