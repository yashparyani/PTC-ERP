const express = require('express');
const router = express.Router();

const {finalizeBlend , fetchblend} = require("../controllers/blendControl");
const {auth,isAdmin} = require("../middlewares/auth");


router.post('/finalizeBlend',auth,isAdmin,finalizeBlend);
router.post('/fetchblends',auth,fetchblend);


module.exports = router;