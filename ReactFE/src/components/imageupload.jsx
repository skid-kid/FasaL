import React, { useState, useRef } from "react";
import { Client } from "@gradio/client";
import { LanguageServiceClient } from '@google-cloud/language';

export function Imageupload() {
  const [photo, setPhoto] = useState(null);
  const [photoDisplay, setPhotoDisplay] = useState(null);
  const [url, setUrl] = useState("");
  const [predictionResult, setPredictionResult] = useState(null);
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
      if (!url) {
        console.log("Please upload an image and enter crop name");
        return;
      }

      const response_0 = await fetch(url);
      if (!response_0.ok) {
        throw new Error(`Failed to fetch image: ${response_0.statusText}`);
      }

      const exampleImage = await response_0.blob();

      const client = await Client.connect("Shinichi876/crop-disease-detection");
      const result = await client.predict("/predict", {
        image_file: exampleImage,
      });

      setPredictionResult(result.data);
      console.log(result.data);
    } catch (error) {
      console.log("Error fetching disease prediction:", error);
    }
  };

  return (
    <div className=" min-h-screen flex flex-col items-center justify-center">
      <img src="fasal.jpeg" className="h-50 w-80"></img>
      <br />
      <br/>
      <h1 className="font-bold text-5xl text-center">CROP DISEASE DETECTION</h1>
      <br/>
      <h2 className="text-xl mb-2 text-center">Capture Photo with Camera or upload one</h2>
      <video ref={videoRef} autoPlay playsInline width="300" height="200" className="mb-2"></video>
      <div className="flex mb-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={startCamera}>
          Start Camera
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={capturePhoto}>
          Capture Photo
        </button>
      </div>
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

      {/* File Upload Section */}
      <h2 className="text-xl mb-2">Or Upload a Photo</h2>
      <input type="file" accept="image/*" onChange={handleFileUpload} className="mb-4"/>
      
      {photo && (
        <div className="mb-4">
          <h2 className="text-xl mb-2">Selected Photo</h2>
          <img src={photo} alt="Selected" width="300" />
        </div>
      )}

      <div className="flex mb-4">
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={async () => {
            await saveImage();
            await diseasePage();
          }}
        >
          Crop Disease Prediction
        </button>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={saveImage}>
          Save Image
        </button>
      </div>

      {predictionResult && (
        <div>
          <h2 className="text-xl mb-2">Prediction Result</h2>
          <p className="text-green-700 text-3xl">{predictionResult}</p>
        </div>
      )}
    </div>
  );
}