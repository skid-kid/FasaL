import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Form } from "./components/form";
import { Imageupload } from "./components/imageupload";
import {Form1} from "./components/yield";
import {Recommendation} from "./components/recommendation";
import Home from "./components/home";
function App() {
  return (
    <div className="bg-white">
    <Router>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/disease" element={<Imageupload />} />
        <Route path="/fertiliser" element={<Form />} />
        <Route path="/yield" element={<Form1/>} />
        <Route path="/recommendation" element={<Recommendation/>}/>

      </Routes>
      </Router>
      </div>
  );
}

export default App;
