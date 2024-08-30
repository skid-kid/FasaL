import { useState, useRef } from "react";

export function Imageupload() {
  const [photo, setPhoto] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera: ", err);
    }
  };

  const capturePhoto = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(
          videoRef.current,
          0,
          0,
          videoRef.current.videoWidth,
          videoRef.current.videoHeight
        );
        setPhoto(canvasRef.current.toDataURL("image/png"));
        console.log(photo);
      }
    }
  };

  return (
    <div>
      <h1>Camera Access</h1>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        width="600"
        height="400"
      ></video>
      <br />
      <button onClick={startCamera}>Start Camera</button>
      <button onClick={capturePhoto}>Capture Photo</button>
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

      {photo && (
        <div>
          <h2>Captured Photo</h2>
          <img src={photo} alt="Captured" width="300" />
        </div>
      )}
    </div>
  );
}
