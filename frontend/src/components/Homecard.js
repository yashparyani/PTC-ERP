import './Homecard.css';
import teaimage from "../assets/tea-leaf.jpg";
import blend from "../assets/blend.webp";
import create from "../assets/create.jpg";
import final from "../assets/final.png";
import test from "../assets/test.jpg";

function Homecard(props){
    return(
       <div className="home-card" onClick={props.onClick}>
            <div className="home-card-name">{props.name}</div>
            <img 
                className="home-card-img" 
                src={props.name === "Stock" ? teaimage : props.name === "Blend" ? blend : props.name === "Create" ? create : props.name === "Test" ? test : props.name === "Final" ? final : null} 
                alt={props.name} 
            />
       </div>
    );
     
}

export default Homecard;