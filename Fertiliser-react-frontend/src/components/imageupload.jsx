import React, { useState, useRef } from "react";

export function Imageupload() {
  const [photo, setPhoto] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Start camera when user wants to capture a photo
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

  // Capture photo from video stream
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
      }
    }
  };

  // Handle photo upload from file input
  const handleFileUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const fileUrl = URL.createObjectURL(file);
      setPhoto(fileUrl);
    }
  };

  return (
    <div>
      <h1>Take a Photo or Upload One</h1>

      {/* Camera Capture Section */}
      <h2>Capture Photo with Camera</h2>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        width="300"
        height="200"
      ></video>
      <br />
      <button onClick={startCamera}>Start Camera</button>
      <button onClick={capturePhoto}>Capture Photo</button>
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

      {/* File Upload Section */}
      <h2>Or Upload a Photo</h2>
      <input type="file" accept="image/*" onChange={handleFileUpload} />

      {/* Display captured or uploaded photo */}
      {photo && (
        <div>
          <h2>Selected Photo</h2>
          <img src={photo} alt="Selected" width="300" />
        </div>
      )}
    </div>
  );
}
