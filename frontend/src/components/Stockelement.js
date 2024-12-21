
import React from "react";
import "./Stockelement.css";

function Stockelement({stock}) {
  return (
    <div key={stock._id} className="stockelement-wrrapper">
    <div className="stockelement-date">
      {new Date(stock.createdAt).toISOString().slice(0, 10)}
    </div>
    <div className="stockelement-garden">{stock.garden}</div>
    <div className="stockelement-quantity">{stock.quantity} kg</div>
    <div className="stock-element-rate">{stock.rate}</div>
    <div className="stockelement-value">{stock.value}</div>
  </div>
  );
}

export default Stockelement;
