const mongoose = require("mongoose");

const blendSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: () => new Date().setHours(0, 0, 0, 0), // Default to today's date
  },
  teaStocks: [
    {
      stockId: {
        type: mongoose.Schema.Types.ObjectId, // References the Stock schema
        ref: "Stock",
        required: true,
      },
      gardenName: {
        type: String,
        required : true,
      },
      quantityUsed: {
        type: Number,
        required: true,
        set: (val) => parseFloat(val.toFixed(3)), // Ensure 3 decimal places
      },
      stockRate: {
        type: Number,
        required: true,
        set: (val) => parseFloat(val.toFixed(2)), // Ensure 2 decimal places
      },
      stockValue: {
        type: Number,
        required: true,
        set: (val) => parseFloat(val.toFixed(2)), // Ensure 2 decimal places         
      },

    },
  ],
  totalBlendValue: {
    type: Number,
    required: true,
    set: (val) => parseFloat(val.toFixed(2)), // Ensure 2 decimal places
  },
  pricePerKg: {
    type: Number,
    required: true,
    set: (val) => parseFloat(val.toFixed(2)), // Ensure 2 decimal places
  },
  totalQuantity: {
    type: Number,
    required: true,
    set: (val) => parseFloat(val.toFixed(3)), // Ensure 3 decimal places
  },
  
  isElaichiAdded: {
    type: Boolean,
    required: true,
  },

  elaichiValue: {
    type: Number,
    required: true,
    set: (val) => parseFloat(val.toFixed(2)), // Ensure 2 decimal places
  },
  elaichiRate: {
    type: Number,
    required: true,
    set: (val) => parseFloat(val.toFixed(2)), // Ensure 2 decimal places
  },
  elaichiQty: {
    type: Number,
    required: true,
    set: (val) => parseFloat(val.toFixed(3)), // Ensure 3 decimal places
  },
  blendName: {
    type: String,
    required: true
  }

});

const Blend = mongoose.model("Blend", blendSchema);

module.exports = Blend;
