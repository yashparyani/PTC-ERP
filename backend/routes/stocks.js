const multer  = require('multer')
const express = require('express');
const router = express.Router();

const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Resolving the path to "uploads" directory
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

//import controllers

const {uploadFile,fetchStocks} = require('../controllers/stocksControl');

const {auth, isAdmin} = require('../middlewares/auth');

router.post('/upload',auth,upload.single('file'),uploadFile);
router.post('/fetchstock',auth,fetchStocks);


module.exports = router;