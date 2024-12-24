const multer  = require('multer')
const express = require('express');
const router = express.Router();


const storage = multer.memoryStorage();
const upload = multer({ storage });

//import controllers

const {uploadFile,fetchStocks} = require('../controllers/stocksControl');

const {auth, isAdmin} = require('../middlewares/auth');

router.post('/upload',auth,upload.single('file'),uploadFile);
router.post('/fetchstock',auth,fetchStocks);


module.exports = router;
