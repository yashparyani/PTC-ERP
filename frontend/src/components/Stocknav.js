import React, { useState } from "react";
import axios from "axios";
import Stockelement from "./Stockelement";
import Upload from "./Upload";
import "./Stocknav.css";

function Stocknav() {
  const [showUpload, setShowUpload] = useState(false);
  const [showTable, setTable] = useState(false);
  const [stocks, setStocks] = useState([]);
  

  const handleUploadClick = () => {
    setShowUpload(true);
  };

  const handleCloseUpload = () => {
    setShowUpload(false);
  };

  const handleFetchClick = async () => {
    setTable(true);
    const token = localStorage.getItem("token");
    
    try {
      const fetchedStocks = await axios.post(
        "http://localhost:5000/fetchstock",{},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to header
          },
        }
      );
      setStocks(fetchedStocks.data.stock_result);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <div className="nav">
        <div className="logo-name">PTC-ERP</div>
        <div className="nav-btns">
          <button className="up-btn" onClick={handleUploadClick}>
            Upload
          </button>
          <button className="add-btn" onClick={handleFetchClick}>
            Fetch
          </button>
        </div>
      </div>
      {showUpload && (
        <Upload onClose={handleCloseUpload} setShowUpload={setShowUpload} />
      )}

      <div className="stock-table">
        {showTable && (
          <div className="stockelement-wrrapper-i">
            <div className="stockelement-date-i">Date</div>
            <div className="stockelement-garden-i">Garden name</div>
            <div className="stockelement-quantity-i">Qty in Kg</div>
            <div className="stock-element-rate-i">Rate per Kg</div>
            <div className="stockelement-value-i">Value</div>
          </div>
        )}

        {stocks.map((stock) => (
          <Stockelement key={stock._id} stock={stock} />
        ))}
      </div>
    </div>
  );
}

export default Stocknav;
