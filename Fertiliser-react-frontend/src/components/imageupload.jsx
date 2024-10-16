import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
export function Imageupload() {
  const [photo, setPhoto] = useState(null);
  const [photoDisplay, setPhotoDisplay] = useState(null);
  const [url, setUrl] = useState("");
  const [crop, setCrop] = useState("");
  const [predictionResult, setPredictionResult] = useState(null);
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
        canvasRef.current.toBlob((blob) => {
          setPhotoDisplay(blob);
        });
        setPhoto(canvasRef.current.toDataURL("image/png"));
      }
    }
  };

  const handleFileUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const fileUrl = URL.createObjectURL(file);
      setPhoto(fileUrl);
      setPhotoDisplay(file);
    }
  };

  const handleCropInput = (event) => {
    setCrop(event.target.value);
  };

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

  // Helper function to format the predicted disease
  const formatDiseaseName = (disease) => {
    if (!disease) return "No disease prediction available";
    return disease
      .replace(/_/g, " ")
      .replace(/^(.)/, (match) => match.toUpperCase());
  };

  return (
    <div className="min-w-full min-h-screen" >
      <nav className="flex justify-center  text-red-400">
        <h1 className="text-red-600">Hello World</h1>

      </nav>
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
      <button style={{padding:10,margin:5}} onClick={startCamera}>Start Camera</button>
      <button style={{padding:10,margin:5}} onClick={capturePhoto}>Capture Photo</button>
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

      {/* File Upload Section */}
      <h2>Or Upload a Photo</h2>
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleFileUpload} 
      />
      <br /><br />
      <br></br>
      <input 
        style={{width:200, height:30}}
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
        <button style={{padding:10,margin:5}}onClick={phpage}>Fertiliser</button>
        <button style={{padding:10,margin:5}} onClick={async () => { await saveImage(); await diseasePage(); }}>Crop Disease Prediction</button>
        <button style={{padding:10,margin:5}} onClick={saveImage}>Save Image</button>
        <button style={{padding:10,margin:5}} onClick={Yield}>Crop Yield</button>
        <button style={{padding:10,margin:5}} onClick={recommendation}>Crop Recommendation</button>
      </div>

      {predictionResult && (
        <div>
          <h2>Prediction Result</h2>
          <p>{formatDiseaseName(predictionResult.predicted_disease)}</p>
        </div>
      )}
    </div>
  );
}
