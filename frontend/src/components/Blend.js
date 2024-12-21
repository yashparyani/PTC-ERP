import Navbar from "./Navbar";
import Homecard from "./Homecard";
import "./Home.css";
import { useNavigate } from "react-router-dom";

function Blend(params) {
  const navigate = useNavigate();
  const handleCreateClick = () => {;
    navigate("/createblend");
  };

  const handleTestClick = () => {
    navigate("/testblend"); 
  };

  const handleFinalClick = () => {
    navigate("/finalblend"); 
  };

  return (
    <div className="home-wrraper">
      <Navbar />
      <div className="home-page-cards">
        <Homecard name="Create" onClick={handleCreateClick}/>
        <Homecard name="Test"  onClick={handleTestClick} />
        <Homecard name="Final"  onClick={handleFinalClick} />
      </div>
    </div>
  );
}

export default Blend;
