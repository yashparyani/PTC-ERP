const mongoose = require("mongoose");

// Define a helper function to format numbers
const formatDecimal = (number, decimalPlaces) => {
  return number.toFixed(decimalPlaces);
};

const stockSchema = new mongoose.Schema({
  garden: {
    type: String,
    required: true, // Garden name is required
  },
  quantity: {
    type: Number,
    required: true,
    min: 0, // Ensures quantity cannot be negative
    get: (val) => formatDecimal(val, 3), // Format to 3 decimal places
    set: (val) => parseFloat(val.toFixed(3)), // Ensure data is stored with 3 decimals
  },
  rate: {
    type: Number,
    required: true,
    min: 0, // Ensures rate cannot be negative
    get: (val) => formatDecimal(val, 2), // Format to 2 decimal places
    set: (val) => parseFloat(val.toFixed(2)), // Ensure data is stored with 2 decimals
  },
  value: {
    type: Number,
    required: true,
    min: 0, // Ensures value cannot be negative
    get: (val) => formatDecimal(val, 2), // Format to 2 decimal places
    set: (val) => parseFloat(val.toFixed(2)), // Ensure data is stored with 2 decimals
  },
  createdAt: {
    type: Date,
    default: () => new Date().setHours(0, 0, 0, 0),
  },
});

// Enable getters when converting documents to JSON or objects
stockSchema.set("toJSON", { getters: true });
stockSchema.set("toObject", { getters: true });

const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;
