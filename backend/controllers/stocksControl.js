const stock = require("../models/Stock");
const reader = require("xlsx");
const path = require("path");
const fs = require("fs"); // File system module

exports.uploadFile = async (req, res) => {
  try {
    // Save file to Vercel's temporary directory
    // Get the uploaded file path
    const filePath = req.file.path; // File saved in /tmp directory
    console.log("Uploaded file path:", filePath);

    // Read the file using xlsx
    const file = reader.readFile(filePath);
    const sheets = file.SheetNames;
    const bulkInsertData = []; // Array to hold all records for bulk insert

    for (let i = 0; i < sheets.length; i++) {
      const sheetData = reader.utils.sheet_to_json(file.Sheets[sheets[i]], {
        header: 1, // Read as 2D array
      });

      // Skip the first row
      const rows = sheetData.slice(1);

      for (let j = 1; j < rows.length - 1; j++) {
        const row = rows[j];
        if (!row[0] || !row[1] || !row[2]) continue; // Skip invalid rows

        bulkInsertData.push({
          garden: row[0],
          quantity: Number(row[1]),
          rate: Number(row[2]),
          value: parseFloat((row[1] * row[2]).toFixed(2)), // Calculate and trim to 2 decimal points
          createdAt: new Date(new Date().setHours(0, 0, 0, 0)),
        });
      }
    }

    // Perform bulk insert
    if (bulkInsertData.length > 0) {
      await stock.insertMany(bulkInsertData);
    }
    console.log("Data uploaded");

    // Clean up: Delete temporary file
    fs.unlinkSync(tempFilePath);

    return res.status(200).json({
      success: true,
      message: "File processed and data stored successfully",
      stocks: bulkInsertData,
    });
  } catch (error) {
    console.error("Error processing file upload:", error);

    // Clean up: Ensure temporary file is deleted in case of an error
    if (fs.existsSync(tempFilePath)) {
      fs.unlinkSync(tempFilePath);
    }

    return res.status(500).json({
      success: false,
      message: "Failed to process the uploaded file",
    });
  }
};
// const stock = require("../models/Stock");
// const reader = require("xlsx");
// const path = require("path");
// const { log } = require("console");

// exports.uploadFile = async (req, res) => {
//   try {
//     const filePath = path.join(__dirname, "../uploads", req.file.filename);
//     const file = reader.readFile(filePath);

//     const sheets = file.SheetNames;
//     const bulkInsertData = []; // Array to hold all records for bulk insert

//     for (let i = 0; i < sheets.length; i++) {
//       const sheetData = reader.utils.sheet_to_json(file.Sheets[sheets[i]], {
//         header: 1, // Read as 2D array
//       });

//       // Skip the first row
//       const rows = sheetData.slice(1);

//       for (let j = 1; j < rows.length - 1; j++) {
//         const row = rows[j];
//         if (!row[0] || !row[1] || !row[2]) continue; // Skip invalid rows

//         bulkInsertData.push({
//           garden: row[0],
//           quantity: Number(row[1]),
//           rate: Number(row[2]),
//           value: parseFloat((row[1] * row[2]).toFixed(2)), // Calculate and trim to 2 decimal points
//           createdAt: new Date(new Date().setHours(0, 0, 0, 0)),
//         });
//       }
//     }

//     // Perform bulk insert
//     if (bulkInsertData.length > 0) {
//       await stock.insertMany(bulkInsertData);
//     }
//     console.log("data uploaded");
    
//     return res.status(200).json({
//       success: true,
//       message: "File processed and data stored successfully",
//       stocks: bulkInsertData
//     });
//   } catch (error) {
//     console.error("Error processing file upload:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to process the uploaded file",
//     });
//   }
// };


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
