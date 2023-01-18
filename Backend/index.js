const express = require("express");
const { connection } = require("./config/connection");
require("dotenv").config();
const cors = require("cors");
const nodemailer = require("nodemailer");
const { UserModel } = require("./model/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userRouter } = require("./routes/user.route");
const { authenticator } = require("./middlewares/authenticator.middlewares");
const { ProductModel } = require("./model/product.model");


const app = express();
app.use(cors());
app.use(express.json());

app.post("/", (req, res) => {
  res.send("hii okk");
});

app.use('/user',userRouter)

// Description:{type:String,require:true},
// Rating:{type:String,require:true},
// Price:{type:String,require:true},
// Discount:{type:Number},
// Category:{type:String,require:true},
// userID:String

app.use(authenticator);
app.post('/pro',async(req,res)=>{
    let {Description,Rating,Price,Discount,Category,userID} = req.body;
    try {
        let payload = req.body;
        let pushdata = new ProductModel(payload);
         await pushdata.save();
         console.log(pushdata);
         res.send({msg:'Product has been added',pushdata});
    } catch (error) {
        res.send({msg:'error in adding product'})
        console.log(error);
    }
})

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log(`connected to DB ${process.env.port}`);
  } catch (error) {
    console.log("erro");
    console.log(error);
  }
});
