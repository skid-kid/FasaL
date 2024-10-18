import React from "react";
import { useNavigate } from "react-router-dom";
export default function Home() {


    const navigate = useNavigate();
  
    const navigateTo = (path) => {
      navigate(path);
    };

  const sections = [
    { bg: "bg-cyan-50", img: "d1.webp", title: "INSTANT CROP DISEASE DETECTION", button: "Test Now", path: "disease", desc: "We have sorted the major crops grown in India and will predict any crop diseases related to them using an advanced three-step process. This method ensures accurate and timely identification of potential threats, safeguarding agricultural productivity and farmers' livelihoods" },
    { bg: "bg-orange-50", img: "d2.svg", title: "EXPECTED CROP YIELD", button: "Check Yield for your next Crop", path: "yield", desc: "An AI model predicts crop yield by analyzing parameters such as land area, humidity, temperature, and average rainfall. It helps farmers and planners optimize planting strategies and resource allocation to maximize productivity and manage agricultural risks effectively." },
    { bg: "bg-yellow-100", img: "nl.svg", title: "CROP RECOMMENDATION", button: "Get Instant Crop Recommendation", path: "recommendation", desc: "This AI model suggests optimal crops based on soil type, crop type, temperature, humidity, rainfall, and pH levels. It helps farmers choose the best-suited crops for their conditions, enhancing yield quality and sustainability in agriculture." },
    { bg: "bg-pink-50", img: "n1.svg", title: "FERTILISER LEVEL RECOMMENDATION", button: "Find Suitable NPK level", path: "fertiliser", desc: "The AI model predicts the appropriate fertilizer levels by analyzing soil nutrients, crop type, growth stage, temperature, humidity, and rainfall. It ensures efficient fertilizer use, promoting crop health and sustainable farming by preventing over-fertilization and reducing costs." }
  ];

  return (
    <div className="min-h-screen w-full bg-cover">
       <header className="sticky top-0 flex justify-between items-center p-2 z-10 bg-white shadow-md">
        <img src="leave.svg" alt="leave" className="w-8 h-md:h-10" />
        <h1 className="text-green-700 text-xl md:text-xl">HOME</h1>

        <img src="leave.svg" alt="leave" className="w-8 h-8 md:w-10 md:h-10" />
      </header>

     

      <main className="px-4 md:px-8 py-6 md:py-10">
        <div className="flex justify-center mb-6">
          <img src="fasal.jpeg" alt="Fasal" className="h-32 w-64 md:h-40 md:w-80 object-cover" />
        </div>

        <div className="text-center mb-10">
          <h1 className="text-2xl md:text-4xl font-bold mb-4">The Ultimate Solution for Farmers</h1>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
            Experience Fasal, the ultimate solution for farming challenges in India.
            From crop disease detection and proper fertilizer usage to crop yield prediction and crop recommendations,
            Fasal harnesses the power of AI to provide comprehensive solutions.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {[
            { img: "p1.svg ", title: "Crop Disease Detection", desc: "Input your crop/leaf image, and with the help of an AI model, it predicts the disease affecting your crop. This tool helps in early detection and timely treatment." },
            { img: "p2.svg", title: "Fertiliser Recommendation", desc: "Predict the required NPK levels for fertilisers after taking inputs of certain properties or fields, ensuring optimal growth for your crops." },
            { img: "p3.svg", title: "Crop & Yield Recommendation", desc: "Get crop recommendations, expected yield based on conditions like soil type and crop type you want to grow, helping farmers make informed decisions." }
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center shadow-xl rounded-2xl p-4">
              <img src={item.img} alt={item.title} className="h-16 w-16 md:h-20 md:w-20 mb-3" />
              <h2 className="text-lg md:text-xl font-bold text-center mb-2">{item.title}</h2>
              <p className="text-gray-500 text-sm text-center">{item.desc}</p>
            </div>
          ))}
        </div>
      </main>
      <br/>

      {sections.map((section, index) => (
        <section key={index} className={`${section.bg} py-10 px-4 md:px-8`}>
          <div className="flex flex-col md:flex-row items-center max-w-5xl mx-auto">
            <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
              <h2 className="font-bold text-xl md:text-2xl text-center md:text-left mb-4">{section.title}</h2>
              <p className="text-sm md:text-base font-light mb-4">
                {section.desc}
              </p>
              <button 
                onClick={() => navigateTo(section.path)} 
                className="block w-full md:w-auto text-white text-lg px-6 py-2 bg-green-500 rounded-xl hover:bg-green-600 transition-colors"
              >
                {section.button}
              </button>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img src={section.img} alt="Illustration" className="h-64 w-64 md:h-80 md:w-80" />
            </div>
          </div>
        </section>
      ))}
      <div className="flex justify-center m-14 p-14">
        <div className="justify-center font-bold text-3xl text-black">
          <h1>LAUNCHING OUR MOBILE APPLICATION SOON!</h1>
          <img src="image.png" alt="mobile" className="w-100 h-100" />
        </div>
      </div>
    </div>
  );
}