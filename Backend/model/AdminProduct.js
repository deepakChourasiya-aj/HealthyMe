const express = require('express')
const mongoose = require('mongoose')

const AdminproductSchema = mongoose.Schema({
    Image:{type:String},
    Description:{type:String},
    Rating:{type:String},
    Price:{type:Number},
    Discount:{type:Number},
    Category:{type:String},
    userID:String
    
})

const AdminProductModel = mongoose.model('adminproductdata',AdminproductSchema);
module.exports = {AdminProductModel}


// "name":"Deepak",
// "email":"Admin123@gmail.com",
// "password":"Admin",
// "location":"Mumbai"

// Image:{type:String,require:true},
// Description:{type:String,require:true},
// Rating:{type:String,require:true},
// Price:{type:Number,require:true},
// Discount:{type:Number},
// Category:{type:String,require:true},
// userID:String