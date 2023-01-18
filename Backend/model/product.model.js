const express = require('express')
const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    Image:{type:String,require:true},
    Description:{type:String,require:true},
    Rating:{type:String,require:true},
    Price:{type:Number,require:true},
    Discount:{type:Number},
    Category:{type:String,require:true},
    userID:String
    
})

const ProductModel = mongoose.model('productdata',productSchema);
module.exports = {ProductModel}