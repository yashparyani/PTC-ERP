const { Promise } = require("mongoose");
const blend = require("../models/Blend");
const Stock = require("../models/Stock");


exports.finalizeBlend = async (req,res) => {

    const blendObj = req.body
    // console.log(blendObj);
    const isWhitespaceString = str => !str.replace(/\s/g, '').length
    //validate 

    if(!blendObj.blendName || isWhitespaceString(blendObj.blendName)) {
        return res.status(404).json({
            success:false,
            message: "Enter Blend Name"
        })
    }

    if(blendObj.stocksAdded.length === 0) {
        return res.status(404).json({
            success:false,
            message: "Add Stocks"
        })       
    }

    if(blendObj.isElaichiAdded && (!blendObj.elaichiQty || !blendObj.elaichiVal || !blendObj.elaichiRate)) {
        return res.status(404).json({
            success:false,
            message: "Add Elaichi Quantities"
        })       
    }


    //update selected stocks

    try {
        for (let index = 0; index < blendObj.stocksAdded.length; index++) {
            const stockToUpdate = blendObj.stocksAdded[index];
            const doc = await Stock.findById(stockToUpdate.id); // Find stock by ID
      
            if (!doc) {
              return res.status(404).json({
                success: false,
                message: `Stock with ID ${stockToUpdate.id} not found`,
              });
            }
      
            const updatedQty = Number(doc.quantity) - Number(stockToUpdate.qty);
            const updatedValue = Number(updatedQty) * Number(doc.rate);

      
            if (updatedQty < 0) {
              return res.status(400).json({
                success: false,
                message: `Insufficient quantity for stock ${doc.name}`,
              });
            }
      
            doc.set({
              quantity: updatedQty,
              value:  updatedValue
            });
      
            await doc.save(); // Save updated stock
        }


    } catch (error) {
        console.log("Error in updating stocks");
        return res.status(500).json({
            success: false,
            message: "Internal Server Error stock"
        })
    
    }

    const blendStocks = blendObj.stocksAdded;
    const finalstocks = blendStocks.map((stock) => {

        return {
            stockId : stock.id,
            gardenName : String(stock.garden),
            quantityUsed : Number(stock.qty),
            stockRate : Number(stock.rate),
            stockValue : Number(stock.value)
        };

    })
    

    try {
       
        const newBlend = await blend.create({
            teaStocks : finalstocks,
            totalBlendValue : Number(blendObj.blendValue),
            pricePerKg : Number(blendObj.blendRate),
            totalQuantity: Number(blendObj.blendQty),
            isElaichiAdded: Boolean(blendObj.isElaichiAdded),
            elaichiValue: Number(blendObj.elaichiVal),
            elaichiRate: Number(blendObj.elaichiRate),
            elaichiQty: Number(blendObj.elaichiQty),
            blendName: String(blendObj.blendName)
        })
        
    } catch (error) {
        console.log(error.message);
        
        return res.status(500).json({
            success: false,
            message: "Internal Server Error Blend"
        })
    }
    

    try {
       
        const newBlendasStock = await Stock.create({
             garden : blendObj.blendName,
             rate :   Number(blendObj.blendRate) ,
             quantity: Number(blendObj.blendQty),
             value: Number(blendObj.blendValue)

        })
        
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            success: false,
            message: "Internal Server Error Blend as Stock"
        })
    }
    


    return res.status(200).json({
        success: true,
        message : "Added"
    })

};


exports.fetchblend = async (req,res) => {
       
    try {
        const fetchedBlends = await blend.find({});

        return res.status(200).json({
            success : true,
            allblends : fetchedBlends,
            message : "Fetched all blends",
        })

    } catch (error) {

        return res.status(500).json({
            success : false,
            message : "Failed to fetch blends"

        })
        
    }
    

}
