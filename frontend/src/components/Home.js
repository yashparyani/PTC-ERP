import Navbar from "./Navbar";
import Homecard from "./Homecard";
import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home(params) {
  const navigate = useNavigate();
  const handleStockClick = () => {
    console.log("here");
    navigate("/stock");
  };

  const handleBlendClick = () => {
    navigate("/blend"); 
  };
  return (
    <div className="home-wrraper">
      <Navbar />
      <div className="home-page-cards">
        <Homecard name="Stock" onClick={handleStockClick}/>
        <Homecard name="Blend"  onClick={handleBlendClick} />
      </div>
    </div>
  );
}

export default Home;
