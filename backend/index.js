const express = require("express");
const app = express();
require("dotenv").config();

const cors = require('cors');
app.use(cors({
  origin: 'https://2eaa-27-57-252-107.ngrok-free.app/',
  credentials: true, 
}));
const cookieParser = require('cookie-parser');
app.use(cookieParser());


//json parser
app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello world')
})

const {signup,login} = require('./controllers/Login');

router.post('/signup',signup);
router.post('/login',login);


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
