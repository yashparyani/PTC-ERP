import React from "react";
import "./Createnav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";

function FinalBlendCard({ blendObj }) {
  return (
    <div>
      <div
        className="complete-blend-wrraper"
        style={{
          background: "white",
          width: "50%",
          margin: "auto",
          marginBottom: "25px",
        }}
      >
        <div className="blendcard-wrraper" style={{ margin: "0px" }}>
          <div className="final-blendcard-name">
            {blendObj.blendName}
            <div style={{display : "flex" , flexDirection : "row"}}>
            <button className="blend-delete-btn">
            <FontAwesomeIcon
                icon={faEdit} 
                size="2x"
                style={{ color: "#63E6BE"}}
              />
            </button>
            <button className="blend-delete-btn">
              <FontAwesomeIcon
                icon={faTrash} 
                size="2x"
                style={{ color: "#D11A2A"}}
              />
            </button>
            </div>

          </div>
          <div className="placeholders-entity">
            <div className="ss-gn">Garden</div>
            <div className="ss-qty">Qty in kg</div>
            <div className="ss-rate">Rate per kg</div>
            <div className="ss-val">Value</div>
          </div>
          {blendObj.teaStocks.map((stock) => (
            <div key={stock.stockId} className="ss-stocks-wrraper">
              <div className="ss-gn">{stock.gardenName}</div>
              <div className="ss-qty">{stock.quantityUsed} kg</div>
              <div className="ss-rate">₹ {stock.stockRate}</div>
              <div className="ss-val">₹ {stock.stockValue}</div>
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
          {blendObj.isElaichiAdded && (
            <div className="ss-stocks-wrraper">
              <div className="ss-gn" style={{ color: "greenyellow" }}>
                Elaichi
              </div>
              <div className="ss-qty" style={{ color: "greenyellow" }}>
                {blendObj.elaichiQty}
              </div>
              <div className="ss-rate" style={{ color: "greenyellow" }}>
                {blendObj.elaichiRate}
              </div>
              <div className="ss-val" style={{ color: "greenyellow" }}>
                {blendObj.elaichiValue}
              </div>
            </div>
          )}

          <div className="ss-stocks-wrraper">
            <div className="ss-gn" style={{ color: "aqua" }}>
              Total Blend Values
            </div>
            <div className="ss-qty" style={{ color: "aqua" }}>
              {blendObj.totalQuantity} kg
            </div>
            <div className="ss-rate" style={{ color: "aqua" }}>
              ₹ {blendObj.pricePerKg}
            </div>
            <div className="ss-val" style={{ color: "aqua" }}>
              ₹ {blendObj.totalBlendValue}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FinalBlendCard;
