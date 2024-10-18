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
    <div className="min-h-screen min-w-full   bg-cover">
      <div className="sticky top-0 flex justify-between font-bold p-2 z-10 bg-white shadow-md">
        <img src="leave.svg" alt="leave" className="w-10 h-10 " />
        <h1 className="text-green-700 text-3xl m-1 font-bold">FasaL</h1>
        <img src="leave.svg" alt="leave" className="w-10 h-10 "/>
      </div>
      <br />
      <br/>
      <div className="flex justify-center sm:text-2xl text-center p-2 ">
        <img src="/fasal.jpeg" className="h-40 w-80 " />
      </div>
      <br/>
      <div className="flex flex-col items-center mx-14">
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
              <div className="flex flex-col items-center mx-6 shadow-xl rounded-2xl p-2 m-2">
                  <img src="p1.svg" alt="disease" className="h-20 w-20" />
                  <h2 className="text-xl sm:text-xl font-bold text-center">Crop Disease Detection</h2><br/>
                  <h3 className="text-gray-500 font-extralight text-center"> Input your crop/leaf image, and with the help of an AI model, it predicts the disease affecting your crop. This tool helps in early detection and timely treatment.</h3>
              </div>
              <div className="flex flex-col items-center mx-6 shadow-xl rounded-2xl p-2 m-2">
                  <img src="p2.svg" alt="disease" className="h-20 w-20" />
                  <h2 className="text-xl sm:text-xl font-bold text-center">Fertiliser Reccomendation</h2><br/>
                  <h3 className="text-gray-500  text-center font-extralight"> Predict the required NPK levels for fertilisers after taking inputs of certain properties or fields, ensuring optimal growth for your crops.</h3>
              </div>
              <div className="flex flex-col items-center mx-6 shadow-xl rounded-2xl p-2 m-2">
                  <img src="p3.svg" alt="disease" className="h-20 w-20" />
                  <h2 className="text-xl sm:text-xl font-bold text-center">Crop & Yield Recommendation</h2><br/>
                  <h3 className="text-gray-500 font-extralight text-center"> Get crop recommendations,expected yield based on conditions like soil type and crop type you want to grow, helping farmers make informed decisions.</h3>
              </div>
      </div> 
      <br></br>
      <br/>
      <div className=" bg-cyan-50 grid gap-6 md:grid-cols-2 items-center shadow-xl p-14 max-w-full">
          <div className="max-w-5xl items-center mx-44">
            <h1 className="font-bold text-2xl text-center">INSTANT CROP DISEASE PREDICTION</h1>
            <br/>
          <p className=" text-medium font-extralight">We have sorted the major crops grown in India and will predict any crop diseases related to them using an advanced three-step process. This method ensures accurate and timely identification of potential threats, safeguarding agricultural productivity and farmers' livelihoods.</p>
          <br/>
          <a href="/disease" className="text-white text-xl m-2 p-2 bg-green-500 rounded-xl">Test Now</a>
        </div>
          <div>
            <img src="n1.svg" alt="disease" className="h-80 w-80" />
            </div>
      </div>
      <div className=" bg-orange-100 grid gap-6 md:grid-cols-2 items-center shadow-xl p-24 max-w-full">
          <div className="max-w-5xl items-center mx-44">
            <h1 className="font-bold text-2xl">EXPECTED CROP YIELD</h1>
            <br/>
          <p className=" text-medium font-extralight">We have sorted the major crops grown in India and will predict any crop diseases related to them using an advanced three-step process. This method ensures accurate and timely identification of potential threats, safeguarding agricultural productivity and farmers' livelihoods.</p>
          <br/>
          <a href="/disease" className="text-white text-xl m-2 p-2 bg-green-500 rounded-xl">Test Now</a>
        </div>
          <div>
            <img src="n1.svg" alt="disease" className="h-80 w-80" />
            </div>
      </div>
      <div className=" bg-pink-50 grid gap-6 md:grid-cols-2 items-center shadow-xl p-14 max-w-full">
          <div className="max-w-5xl items-center mx-44">
            <h1 className="font-bold text-2xl">FERTILISER LEVEL RECOMMENDATION</h1>
            <br/>
          <p className=" text-medium font-extralight">We have sorted the major crops grown in India and will predict any crop diseases related to them using an advanced three-step process. This method ensures accurate and timely identification of potential threats, safeguarding agricultural productivity and farmers' livelihoods.</p>
          <br/>
          <a href="/disease" className="text-white text-xl m-2 p-2 bg-green-500 rounded-xl">Test Now</a>
        </div>
          <div>
            <img src="n1.svg" alt="disease" className="h-80 w-80" />
            </div>
      </div>
      <div className=" bg-yellow-100 grid gap-6 md:grid-cols-2 items-center shadow-xl p-14 max-w-full">
          <div className="max-w-5xl items-center mx-44">
            <h1 className="font-bold text-2xl">CROP RECOMMENDATION</h1>
            <br/>
          <p className=" text-medium font-extralight">We have sorted the major crops grown in India and will predict any crop diseases related to them using an advanced three-step process. This method ensures accurate and timely identification of potential threats, safeguarding agricultural productivity and farmers' livelihoods.</p>
          <br/>
          <a href="/disease" className="text-white text-xl m-2 p-2 bg-green-500 rounded-xl">Test Now</a>
        </div>
          <div>
            <img src="n1.svg" alt="disease" className="h-80 w-80" />
            </div>
      </div>
    </div>
  );
}
