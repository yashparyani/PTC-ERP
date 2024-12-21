import React from 'react';
import "./Createnav.css"


function FinalBlendCard({ blendObj }) {
    
    return(
        <div >
        <div className="complete-blend-wrraper" style={{ background : "white",width:"50%"}}>
        <div className="blendcard-wrraper" style={{ margin : "0px"}}>
          
           <div className="blendcard-name">{blendObj.blendName}</div>
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
          <div className="ss-stocks-wrraper">
            <div
              className="ss-gn"
              style={{ color: "greenyellow" }}
            >
               "Elaichi"
            </div>
            <div className="ss-qty" style={{ color: "greenyellow" }}>{blendObj.elaichiQty}</div>
             <div className="ss-rate" style={{ color: "greenyellow" }}>{blendObj.elaichiRate}</div>
            <div className="ss-val" style={{ color: "greenyellow" }}>{blendObj.elaichiValue}</div>
          </div>
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
