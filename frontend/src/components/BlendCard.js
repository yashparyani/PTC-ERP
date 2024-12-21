import { useEffect, useState } from "react";
import axios from "axios";
import "./Createnav.css";

function BlendCard({ selectedStocks , setSelected}) {
  const [quantity, setQuantity] = useState("0");
  const [rate, setRate] = useState("0");
  const [values, setValues] = useState("0");
  const [elaichiVal, setElaichiValue] = useState("0");
  const [elaichiQty, setElaichiQty] = useState("0");
  const [elaichiRate, setElaichiRate] = useState("0");
  const [isElaichiClicked, setIsElaichiClicked] = useState(false);
  const [Blendname, setBlendname] = useState("");

  const handleName = (event) => {    
    setBlendname(event.target.value);
  };

  function setALLvalue() {
    let q = 0;
    let r = 0;
    let v = 0;

    // Calculate total quantity and value from selected stocks
    for (let index = 0; index < selectedStocks.length; index++) {
      q += Number(selectedStocks[index].qty || 0);
      v += Number(selectedStocks[index].value || 0);
    }

    q = Number(q).toFixed(3);
    v = Number(v).toFixed(2);

    if (Number(q) === 0 || Number(v) === 0) {
      r = Number(0).toFixed(2); // Default rate if no stock data
    } else {
      r = (v / q).toFixed(2);
    }

    // Calculate Elaichi quantity and values if clicked
    if (isElaichiClicked) {
      const eqty = Number(elaichiQty);
      const erate = Number(elaichiRate);
      const evalue = (erate * eqty).toFixed(2);

      setElaichiValue(evalue);

      // Update final quantities and values
      const finalq = (Number(q) + Number(eqty)).toFixed(3);
      const finalv = (Number(v) + Number(evalue)).toFixed(2);
      const finalr = (Number(finalv) / Number(finalq)).toFixed(2);

      setQuantity(finalq);
      setValues(finalv);
      setRate(finalr);
    } else {
      // If Elaichi is not clicked, set values without it
      setQuantity(q);
      setValues(v);
      setRate(r);
    }
  }

  const handleElaichiClick = () => {
    if (isElaichiClicked) {
      setIsElaichiClicked(false);
      setElaichiQty("0");
      setElaichiRate("0");
      setElaichiValue("0");
      setALLvalue();
    } else {
      setIsElaichiClicked(true);
      let eqty = Number(quantity) * 0.015;
      eqty = Number(eqty).toFixed(3);
      setElaichiQty(eqty);
      setALLvalue();
    }
  };



  useEffect(() => {
    let q = 0;

    // Calculate total quantity and value from selected stocks
    for (let index = 0; index < selectedStocks.length; index++) {
      q += Number(selectedStocks[index].qty);
    }

    let eqty = (0.015 * Number(q)).toFixed(3);
    setElaichiQty(eqty);
  }, [selectedStocks]);

  const handleElaichiqty = (event) => {
    setElaichiQty(event.target.value);
  };

  const handleElaichirate = (event) => {
    setElaichiRate(event.target.value);
  };

  useEffect(() => {
    setALLvalue();
  }, [selectedStocks, elaichiQty, elaichiRate]);


  const handleFinalClick = async () => {
    const token = localStorage.getItem("token");
    
    try {
      const response = await axios.post(
        "http://localhost:5000/finalizeBlend",
        {
            blendName : Blendname,
            stocksAdded : selectedStocks,
            blendQty : quantity,
            blendRate : rate,
            blendValue : values,
            isElaichiAdded : isElaichiClicked,
            elaichiQty : elaichiQty,
            elaichiRate : elaichiRate,
            elaichiVal : elaichiVal

        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to header
          },
        }
      );
      alert(response.data.message)
      
      if (response.data.success) {
        setSelected([]);
        setQuantity("0");
        setRate("0");
        setValues("0");
        setElaichiQty("0");
        setElaichiRate("0");
        setElaichiValue("0");
        setBlendname("");
      }
      else{
        alert("Error in finaling blend")
      }

    } catch (error) {
      alert(error.response.data.message);
    }
  }

  return (
    <div className="complete-blend-wrraper">
      <div className="blendcard-wrraper">
        <input
          className="blendcard-name"
          type="text"
          value={Blendname}
          placeholder="BLEND NAME"
          onChange={handleName}
          required
        />
        <div className="placeholders-entity">
          <div className="ss-gn">Garden</div>
          <div className="ss-qty">Qty in kg</div>
          <div className="ss-rate">Rate per kg</div>
          <div className="ss-val">Value</div>
        </div>
        {selectedStocks.map((stock) => (
          <div key={stock.id} className="ss-stocks-wrraper">
            <div className="ss-gn">{stock.garden}</div>
            <div className="ss-qty">{stock.qty} kg</div>
            <div className="ss-rate">₹ {stock.rate}</div>
            <div className="ss-val">₹ {stock.value}</div>
          </div>
        ))}
        <div className="ss-stocks-wrraper">
          <div className="ss-gn" style={{ height: "20px" }}></div>
          <div className="ss-qty" style={{ height: "20px" }}></div>
          <div className="ss-rate" style={{ height: "20px" }}></div>
          <div className="ss-val" style={{ height: "20px" }}></div>
        </div>
        <div className="ss-stocks-wrraper">
          <div className="ss-gn" style={{ height: "20px" }}></div>
          <div className="ss-qty" style={{ height: "20px" }}></div>
          <div className="ss-rate" style={{ height: "20px" }}></div>
          <div className="ss-val" style={{ height: "20px" }}></div>
        </div>
        <div className="ss-stocks-wrraper">
          <div
            className="ss-gn"
            style={{ height: "22px", color: "greenyellow" }}
          >
            {isElaichiClicked ? "Elaichi" : ""}
          </div>
          <input
            disabled={!isElaichiClicked}
            type="number"
            min={0}
            value={isElaichiClicked ? elaichiQty : "0"} // Display Elaichi quantity based on total quantity
            className="el-qty"
            onChange={handleElaichiqty}
            style={{ height: "19px" }}
          />
          <input
            disabled={!isElaichiClicked}
            type="number"
            min={0}
            value={isElaichiClicked ? elaichiRate : "0"} // Keep Elaichi rate (default can be adjusted later)
            className="el-rate"
            onChange={handleElaichirate}
            style={{ height: "19px" }}
          />
          <div
            className="ss-val"
            style={{ height: "22px", color: "greenyellow" }}
          >
            {isElaichiClicked ? elaichiVal : ""}
          </div>
        </div>
        <div className="ss-stocks-wrraper">
          <div className="ss-gn" style={{ color: "aqua" }}>
            Total Blend Values
          </div>
          <div className="ss-qty" style={{ color: "aqua" }}>
            {quantity} kg
          </div>
          <div className="ss-rate" style={{ color: "aqua" }}>
            ₹ {rate}
          </div>
          <div className="ss-val" style={{ color: "aqua" }}>
            ₹ {values}
          </div>
        </div>
      </div>

      <button className="add-elachi-btn" onClick={handleElaichiClick}>
        {!isElaichiClicked ? "Elaichi" : "Delete"}
      </button>
      <button className="final-blend-btn" onClick = {handleFinalClick}>Final</button>
    </div>
  );
}

export default BlendCard;
