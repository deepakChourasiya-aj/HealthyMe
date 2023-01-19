const express = require('express')
const mongoose = require('mongoose');
const { AdminProductModel } = require('../model/AdminProduct');
const adminRoute = express.Router();



adminRoute.post('/add',async(req,res)=>{
    try {
        let payload = req.body;
        let product = new AdminProductModel(payload)
        await product.save();
        res.send({msg:'admin has added the data',payload});
    } catch (error) {
        res.send({msg:'error in adding the product'})
    }
})

adminRoute.get('/all',async(req,res)=>{
    try {
        let payload = req.body;
        let product = await AdminProductModel.find()
        res.send(product);
        console.log(product.length);
    } catch (error) {
        res.send({msg:'error in adding the product'})
    }
})

adminRoute.delete("/delete/:id",async(req,res)=>{
  let id = req.params.id;
  console.log(id)
  try {
    let deleteproduct = await AdminProductModel.findByIdAndRemove({'_id':id});
    res.send({msg:'product has been deleted'});
  } catch (error) {
    res.send({msg:'error in deleting'})
  }  
})

adminRoute.patch("/update/:id",async(req,res)=>{
  let id = req.params.id;
  let payload = req.body;
  console.log(id)
  try {
    let updateProduct = await AdminProductModel.findByIdAndUpdate({'_id':id},payload);
    res.send({msg:'product has been updated'});
  } catch (error) {
    res.send({msg:'error in updated'})
  }  
})

module.exports = {adminRoute}