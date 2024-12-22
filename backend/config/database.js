const mongoose = require('mongoose');
require("dotenv").config();

const url = `mongodb+srv://DeepakParyani:deepakbaba@cluster0ptcerp.ovhgf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0PTCERP`;

console.log(url);


exports.connect = async () => {

    mongoose.connect(`${url}`)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
    
}

