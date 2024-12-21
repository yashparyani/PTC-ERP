import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import Stock from "./components/Stock";
import Blend from "./components/Blend";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Upload from "./components/Upload";
import Stockelement from "./components/Stockelement";
import Createnav from "./components/Createnav";
import FinalBlends from "./components/FinalBlends";
function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="Home" element={<Home />}/>
        <Route path="stock" element={<Stock />} />
        <Route path="blend" element={<Blend />} />
        <Route path="upload" element={<Upload />} />
        <Route path="stockelement" element={<Stockelement />} />
        <Route path="createblend" element={<Createnav/>} />
        <Route path="testblend" element={<Createnav/>} />
        <Route path="finalblend" element={<FinalBlends/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
