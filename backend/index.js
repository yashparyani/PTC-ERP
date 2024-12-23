const express = require("express");
const app = express();
require("dotenv").config();

const cors = require('cors');
app.use(cors({
  origin: "https://ptc-erp-frontend.vercel.app", // Replace with your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, 
}));
const cookieParser = require('cookie-parser');
app.use(cookieParser());


//json parser
app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello world')
})

//router import
const auth = require("./routes/login");
app.use(auth);

const stockRoutes = require("./routes/stocks");
app.use(stockRoutes);

const blendRoutes = require("./routes/blend");
app.use(blendRoutes);


//db connect
require('./config/database').connect();

module.exports = app;
