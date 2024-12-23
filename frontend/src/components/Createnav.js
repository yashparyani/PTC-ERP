import React, { useState, useEffect, useRef } from "react";
import "./Createnav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import BlendCard from "./BlendCard";
function Createnav() {
  const [stocks, setStocks] = useState([]);
  const [blendQuantities, setBlendQuantities] = useState({});
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Authentication token is missing.");
        }

        const fetchedStocks = await axios.post(
          "https://ptc-erp-apis.vercel.app/fetchstock",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(
          "Fetched stocks from API:",
          fetchedStocks.data.stock_result
        );
        setStocks(fetchedStocks.data.stock_result);
      } catch (error) {
        console.error("Error fetching stocks:", error.message);
        alert("Failed to fetch stocks.");
      }
    };

    fetchStocks();
  }, []);

  const handleInputChange = (id, value) => {
    setBlendQuantities((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleAddClick = (id) => {
    const stockToUpdate = stocks.find((stock) => stock._id === id);
    
    console.log(stockToUpdate);
    

    if (!stockToUpdate) {
      alert("Stock not found.");
      return;
    }

    const blendQty = parseFloat(blendQuantities[id]);

    if (blendQty > stockToUpdate.quantity) {
      alert("Blend Qty cannot be greater than available quantity.");
      return;
    }

    if (blendQty <= 0) {
      alert("Blend Qty must be greater than 0.");
      return;
    }

    const updatedStocks = stocks.map((stock) => {
      if (stock._id === id) {
        const updatedQuantity = stock.quantity - blendQty;
        const updatedValue = stock.value - blendQty * stock.rate;

        return {
          ...stock,
          quantity: Number(updatedQuantity).toFixed(3),
          value: Number(updatedValue).toFixed(2),
        };
      }
      return stock;
    });

    setStocks(updatedStocks);

    const selectedStock = stocks.find((stock) => stock._id === id);
    const Bval = blendQty * selectedStock.rate;

    const checkSelected = selected.map((stock) => {
      if (stock.id === id) {
        let upq = (Number(blendQty) + Number(stock.qty)).toFixed(3);
        let upv = (Number(upq) * Number(stock.rate)).toFixed(2)
        return {
          ...stock,
          qty: upq,
          value: upv,
        };
      }
      return stock;
    });

    const exists = selected.some((stock) => stock.id === id);

    if (exists) {
      setSelected(checkSelected);
    } else {
      setSelected((prevSelected) => [
        ...prevSelected,
        {
          id: selectedStock._id,
          garden: selectedStock.garden,
          rate: selectedStock.rate,
          qty: Number(blendQty).toFixed(3),
          value: Number(Bval).toFixed(2),
        },
      ]);
    }

    setBlendQuantities((prev) => ({
      ...prev,
      [id]: "",
    }));
  };

  const handleDeleteClick = (id) => {
     
      let oriQty = 0;
      let oriVal = 0;
      
    const deletedStock = selected.find((select) => select.id === id);

    const revertedStocks = stocks.map((stock) => {
      
      oriQty = (Number(stock.quantity) + Number(deletedStock.qty)).toFixed(3);
      oriVal = (Number(stock.value) + Number(deletedStock.value)).toFixed(2);


      if (stock._id === id) {
         return{
           ...stock,
           quantity : Number(oriQty).toFixed(3),
           value : Number(oriVal).toFixed(2)
         }
      }

      return stock;
    });
    
    setStocks(revertedStocks);

    setSelected((prevSelected) =>
      prevSelected.filter((stock) => stock.id !== id)
    );
  };

  return (
    <div>
      <div className="nav">
        <div className="logo-name">PTC-ERP</div>
      </div>

      <div className="blend-playground-wrraper">
        <div className="stock-select-wrraper">
          <div className="stockelement-wrrapper-j">
            <div className="stockelement-date-j">Date</div>
            <div className="stockelement-garden-j">Garden name</div>
            <div className="stockelement-quantity-j">Qty</div>
            <div className="stock-element-rate-j">Rate</div>
            <div className="stockelement-value-j">Value</div>
            <div className="stockelement-blendQuantity-j">B-Qty</div>
          </div>

          {stocks.map((stock) => (
            <div key={stock._id} className="btns-complete-val"  >
              <div  className={`fetchelement-wrrapper-j ${selected.some((item) => item.id === stock._id) ? 'selected-stock' : ''}`}>
                <div className="stockelement-date-j">
                  {new Date(stock.createdAt).toISOString().slice(0, 10)}
                </div>
                <div className="stockelement-garden-j">{stock.garden}</div>
                <div className="stockelement-quantity-j">{stock.quantity}</div>
                <div className="stock-element-rate-j">{stock.rate}</div>
                <div className="stockelement-value-j">{stock.value}</div>
                <input
                  className="stockelement-blendQty"
                  type="number"
                  value={blendQuantities[stock._id] || ""}
                  onChange={(e) => handleInputChange(stock._id, e.target.value)}
                />
              </div>
              <div className="add-delete-btns">
                <button
                  onClick={() => handleAddClick(stock._id)}
                  className="add-btn-createb"
                  disabled={
                    !blendQuantities[stock._id] ||
                    blendQuantities[stock._id] <= 0
                  }
                >
                  <FontAwesomeIcon
                    className="add-btn-icon"
                    icon={faPlus}
                    size="2x"
                    style={{ color: "#63E6BE" }}
                  />
                </button>
                <button
                  className="del-btn-createb"
                  onClick={() => handleDeleteClick(stock._id)}
                  disabled={!selected.some((item) => item.id === stock._id)}
                >
                  <FontAwesomeIcon
                    icon={faTrash}
                    size="2x"
                    style={{ color: "#D11A2A" }}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="created-blend-wrraper">
          <BlendCard selectedStocks={selected} setSelected = {setSelected}/>
        </div>
      </div>
    </div>
  );
}

export default Createnav;
