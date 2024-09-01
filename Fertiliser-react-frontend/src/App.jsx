//import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Form } from "./components/form";
import { Imageupload } from "./components/imageupload";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Imageupload />} />
        <Route path="/ph" element={<Form />} />
      </Routes>
    </Router>
  );
}

export default App;
