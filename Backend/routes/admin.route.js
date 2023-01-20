const express = require('express')
const mongoose = require('mongoose');
const { AdminProductModel } = require('../model/AdminProduct');
const adminRoute = express.Router();



adminRoute.post('/add', async (req, res) => {
  try {
    let payload = req.body;
    let product = new AdminProductModel(payload)
    await product.save();
    res.send({ msg: 'admin has added the data', payload });
  } catch (error) {
    res.send({ msg: 'error in adding the product' })
  }
})

adminRoute.get('/all/:pricehandle', async (req, res) => {
  try {
    // let payload = req.body;
    let price = req.params.pricehandle
    // console.log(price)
    if (price == 'Low_to_high') {
      let product = await AdminProductModel.find().sort({ Price: 1 })
      // console.log(price)
      res.send(product);
    }
    else if (price == 'High_to_low') {
      let product = await AdminProductModel.find().sort({ Price: -1 })
      // console.log(price)
      res.send(product);
    }
    else if (price == 'allproduct') {
      let product = await AdminProductModel.find()
      res.send(product);
      console.log(product.length);
    }
    else if (price == 'discount50') {
      let product = await AdminProductModel.find({ Discount: { $gte: 50 } })
      res.send(product);
    }
    else if (price == 'two_to_three') {
      let product = await AdminProductModel.find({ $and: [{ Price: { $gte: 2000 } }, { Price: { $lte: 3000 } }] })
      res.send(product);
    }
    else if (price == 'one_to_two') {
      let product = await AdminProductModel.find({ $and: [{ Price: { $gte: 1000 } }, { Price: { $lte: 2000 } }] })
      res.send(product);
    }
    else if (price == 'three_to_four') {
      let product = await AdminProductModel.find({ $and: [{ Price: { $gte: 3000 } }, { Price: { $lte: 4000 } }] })
      res.send(product);
    }
    else if (price == 'four_to_five') {
      let product = await AdminProductModel.find({ $and: [{ Price: { $gte: 4000 } }, { Price: { $lte: 5000 } }] })
      res.send(product);
    }
    else if (price == 'five_to_until_above') {
      let product = await AdminProductModel.find({ Price: { $gte: 5000 } })
      res.send(product);
    }
   else if(price=='one_star'){
    let product = await AdminProductModel.find({Rating:1})
    if(product){
      res.send(product)
    }else{
      res.send(msg.error)
    }
   }
   else if(price=='two_star'){
    let product = await AdminProductModel.find({Rating:{$gte:2}})
    if(product.length>0){
      res.send(product)
    }else{
      res.send(msg.error)
    }
   }
   else if(price=='three_star'){
    let product = await AdminProductModel.find({Rating:{$gte:3}})
    if(product.length>0){
      res.send(product)
    }else{
      res.send(msg.error)
    }
   }
   else if(price=='four_star'){
    let product = await AdminProductModel.find({Rating:{$gte:4}})
    if(product.length>0){
      res.send(product)
    }else{
      res.send(msg.error)
    }
   }
   else if(price=='five_star'){
    let product = await AdminProductModel.find({Rating:5})
    if(product){
      res.send(product)
    }else{
      res.send(msg.error)
    }
   }
  } catch (error) {
    res.send({ msg: 'error in adding the product' })
  }
})

adminRoute.delete("/delete/:id", async (req, res) => {
  let id = req.params.id;
  console.log(id)
  try {
    let deleteproduct = await AdminProductModel.findByIdAndRemove({ '_id': id });
    res.send({ msg: 'product has been deleted' });
  } catch (error) {
    res.send({ msg: 'error in deleting' })
  }
})

adminRoute.patch("/update/:id", async (req, res) => {
  let id = req.params.id;
  let payload = req.body;
  console.log(id)
  try {
    let updateProduct = await AdminProductModel.findByIdAndUpdate({ '_id': id }, payload);
    res.send({ msg: 'product has been updated' });
  } catch (error) {
    res.send({ msg: 'error in updated' })
  }
})

module.exports = { adminRoute }