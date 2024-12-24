const stock = require("../models/Stock");
const reader = require("xlsx");
const path = require("path");
const fs = require("fs"); // File system module

exports.uploadFile = async (req, res) => {
  try {
    // Ensure that the file is included in the request
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    // Read the file directly from memory
    const file = reader.read(req.file.buffer);

    const sheets = file.SheetNames;
    const bulkInsertData = []; // Array to hold all records for bulk insert

    // Process each sheet in the Excel file
    for (let i = 0; i < sheets.length; i++) {
      const sheetData = reader.utils.sheet_to_json(file.Sheets[sheets[i]], {
        header: 1, // Read as 2D array
      });

      // Skip the first row (headers)
      const rows = sheetData.slice(1);

      // Process each row
      for (let j = 0; j < rows.length; j++) {
        const row = rows[j];

        // Skip invalid rows (empty or missing necessary data)
        if (!row[0] || isNaN(row[1]) || isNaN(row[2])) continue;

        // Prepare data for insertion
        bulkInsertData.push({
          garden: row[0],
          quantity: Number(row[1]), // Convert quantity to a number
          rate: Number(row[2]),     // Convert rate to a number
          value: parseFloat((row[1] * row[2]).toFixed(2)), // Calculate and trim to 2 decimal points
          createdAt: new Date(new Date().setHours(0, 0, 0, 0)), // Set date to midnight
        });
      }
    }

    // Perform bulk insert if there is any valid data
    if (bulkInsertData.length > 0) {
      await stock.insertMany(bulkInsertData);
    }

    console.log("Data uploaded successfully");

    // Send success response
    return res.status(200).json({
      success: true,
      message: "File processed and data stored successfully",
      stocks: bulkInsertData,
    });
  } catch (error) {
    console.error("Error processing file upload:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to process the uploaded file",
    });
  }
};

exports.fetchStocks = async (req,res) => {
  try {
    const results = await stock.find({});
    
    results.sort((a,b) => {
      return a.rate - b.rate;
    })

    
    return res.status(200).json({
        success:true,
        stock_result: results,
        message: "Fetched Stocks"
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed Stocks"
  }); 
  
  }
}
