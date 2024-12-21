const express = require("express");
const app = express();
require("dotenv").config();

const cors = require('cors');
app.use(cors({
  origin: 'https://ptc-erp-apis.vercel.app',
  credentials: true, 
}));
const cookieParser = require('cookie-parser');
app.use(cookieParser());


//json parser
app.use(express.json());

//router import
const auth = require("./routes/login");
app.use(auth);

const stockRoutes = require("./routes/stocks");
app.use(stockRoutes);

const blendRoutes = require("./routes/blend");
app.use(blendRoutes);


//db connect
require('./config/database').connect();

//start server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
