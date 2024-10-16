import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
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

  const disease = () => {
    navigate("/disease");
  };

  return (
    <div className="min-h-screen min-w-full bg-[url('bbblurry.svg')] bg-cover">
      <div className="sticky top-0 flex justify-between font-bold p-2 z-10 bg-white shadow-md">
        <img src="leave.svg" alt="leave" className="w-10 h-10 " />
        <h1 className="text-green-700 text-3xl m-2 font-bold">FasaL</h1>
        <img src="leave.svg" alt="leave" className="w-10 h-10 "/>
      </div>
      <br />
      <div className="flex justify-center sm:text-2xl text-center p-2 ">
        <img src="/nl.svg" className="h-48 w-48 rounded-full" />
      </div>
      <br/>
      <div className="flex flex-col items-center mx-8">
        <h1 className="text-2xl sm:text-4xl text-center font-bold">The Ultimate Solution for Farmers</h1>
        <br/>
        <p className="text-base sm:text-xl text-center  sm:mx-20 text-gray-600 font-medium">
                  Experience Fasal, the ultimate solution for farming challenges in India.
                  From crop disease detection and proper fertilizer usage to crop yield prediction and crop recommendations,
                  Fasal harnesses the power of AI to provide comprehensive solutions.
        </p>
          </div>
          <br />
          <br />
          <br/>
          <div className="max-w-5xl mx-auto p-5 m-5 grid gap-6 md:grid-cols-3 ">
              <div className="flex flex-col items-center mx-6">
                  <img src="p1.svg" alt="disease" className="h-20 w-20" />
                  <h2 className="text-xl sm:text-xl font-bold text-center">Crop Disease Detection</h2><br/>
                  <h3 className="text-gray-500 font-extralight text-center"> Input your crop/leaf image, and with the help of an AI model, it predicts the disease affecting your crop. This tool helps in early detection and timely treatment.</h3>
              </div>
              <div className="flex flex-col items-center mx-6">
                  <img src="p2.svg" alt="disease" className="h-20 w-20" />
                  <h2 className="text-xl sm:text-xl font-bold text-center">Fertiliser Reccomendation</h2><br/>
                  <h3 className="text-gray-500  text-center font-extralight"> Predict the required NPK levels for fertilisers after taking inputs of certain properties or fields, ensuring optimal growth for your crops.</h3>
              </div>
              <div className="flex flex-col items-center mx-6">
                  <img src="p3.svg" alt="disease" className="h-20 w-20" />
                  <h2 className="text-xl sm:text-xl font-bold text-center">Crop & Yield Recommendation</h2><br/>
                  <h3 className="text-gray-500 font-extralight text-center"> Get crop recommendations,yiled based on conditions like soil type and crop type you want to grow, helping farmers make informed decisions.</h3>
              </div>
          </div> 
    </div>
  );
}
