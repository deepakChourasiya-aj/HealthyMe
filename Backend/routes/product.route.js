const express = require('express')
const mongoose = require('mongoose')
const userProductRouter = express.Router();
const { ProductModel } = require('../model/product.model');


userProductRouter.post("/productofuser", async (req, res) => {
    let { Description, Rating, Price, Discount, Category, userID } = req.body;
    try {
      let payload = req.body;
      console.log(req.body.userID);
      let pushdata = new ProductModel(payload);
      await pushdata.save();
      console.log(pushdata);
      res.send({ msg: "Product has been added", pushdata });
    } catch (error) {
      res.send({ msg: "error in adding product" });
      console.log(error);
    }
  });
  
  
  userProductRouter.get("/productofuser", async (req, res) => {
    try {
      let payload = req.body;
      let userID = req.body.userID;
      let data = await ProductModel.find({ userID });
      res.send({ msg: "user data ", data });
    } catch (error) {
      console.log(error);
      res.send("Error in getting due to some security purpose the data");
    }
  });
  

  userProductRouter.patch("/productofuser/update/:id", async (req, res) => {
    console.log(req.params);
    let id = req.params.id;
    const payload = req.body;
    const prod = await ProductModel.findOne({ _id: id });
    const userID_in_pro = prod.userID;
    let userID_making_req = req.body.userID;
    console.log(id);
    try {
      if (userID_in_pro != userID_making_req) {
        res.send({ msg: "you are not authorized" });
      } else {
        let updateProduct = await ProductModel.findByIdAndUpdate(
          { "_id": id },
          payload
        );
        res.send({msg:'product updated successfully',updateProduct});
      }
    } catch (error) {
      res.send({ msg: error.message });
      console.log("something is wrong while updating");
    }
  });
  

  userProductRouter.delete('/productofuser/delete/:id',async(req,res)=>{
      let params=req.params;
      let id = req.params.id;
      let payload =req.body;
      console.log(id)
      let product = await ProductModel.findOne({"_id":id});
      let userId_in_product = product.userID;
      console.log(product,'iam tasktdata');
      console.log(userId_in_product,'iam userId_in_product')
    
      let userid_making_req=req.body.userID;
      console.log(userid_making_req,'making reqest')
      try {
        if(userId_in_product!=userid_making_req){
          res.send('user are not authorized')
        }else{
          let productdeleted = await ProductModel.findByIdAndDelete({"_id":id})
          console.log('productdeleted deleted')
          res.send({msg:'massage:productdeleted deleted succefully',productdeleted})
        }
      } catch (error) {
        res.send({msg:'error is there while updating'})
      }
    
    })
    
    module.exports = {userProductRouter}