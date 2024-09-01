import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";


export function Imageupload() {
  const [photo, setPhoto] = useState(null);
  const [photoDisplay, setPhotoDisplay] = useState(null);
  const [url, setUrl] = useState("");
  const [crop, setCrop] = useState("");
  const [predictionResult, setPredictionResult] = useState(null); // New state for prediction result
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  const phpage = () => {
    navigate("/fertiliser");
  };

  const Yield = () => {
    navigate("/yield");
  };

  const recommendation = () => {
    navigate("/recommendation");
  };

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
        canvasRef.current.toBlob((blob) => {
          setPhotoDisplay(blob);
        });
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
      setPhotoDisplay(file);
    }
  };

  // Update crop state based on input
  const handleCropInput = (event) => {
    setCrop(event.target.value);
  };

  // Save image and get URL
  const saveImage = async () => {
    const data = new FormData();
    data.append("file", photoDisplay);
    data.append("api_key", "dgv7rh3CyecK1miNnlBRWwyZjA4");
    data.append("upload_preset", "FasaLsih");
    data.append("cloud_name", "dnw85xaq7");

    try {
      if (photoDisplay === null) {
        return console.log("Please Upload image");
      }
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dnw85xaq7/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const cloudData = await res.json();
      setUrl(cloudData.url);
      console.log(cloudData.url);
      console.log("Image Upload Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch prediction result from the server
  const diseasePage = async () => {
    try {
      if (!url || !crop) {
        console.log("Please upload an image and enter crop name");
        return;
      }
      const response = await fetch(`http://10.12.29.91:3000/FasaL/crops/diseases/?url=${encodeURIComponent(url)}&crop=${encodeURIComponent(crop)}`);
      const data = await response.json();
      setPredictionResult(data);
    } catch (error) {
      console.log("Error fetching disease prediction:", error);
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
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleFileUpload} 
      />
      <br /><br />
      <h2> Or Upload a Image link</h2>
      <br></br>
      <input 
        type="text" 
        placeholder="Enter Crop" 
        value={crop} 
        onChange={handleCropInput}
      />
      <br /><br />

      {/* Display captured or uploaded photo */}
      {photo && (
        <div>
          <h2>Selected Photo</h2>
          <img src={photo} alt="Selected" width="300" />
        </div>
      )}

      <div>
        <br />
        <button onClick={phpage}>Fertiliser</button>
        <button onClick={async () => { await saveImage(); await diseasePage(); }}>Crop Disease Prediction</button>
        <button onClick={saveImage}>Save Image</button>
        <button onClick={Yield}>Crop Yield</button>
        <button onClick={recommendation}>Crop Recommendation</button>
      </div>
      {predictionResult && (
        <div>
          <h2>Prediction Result</h2>
          <pre>{JSON.stringify(predictionResult, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
