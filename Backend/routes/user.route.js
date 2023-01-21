const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const userRouter = express.Router();
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const { UserModel } = require("../model/usermodel");
const { authenticator } = require("../middlewares/authenticator.middlewares");
const { ProductModel } = require("../model/product.model");
const { AdminProductModel } = require("../model/AdminProduct");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "deepak1812002@gmail.com",
    pass: "lyrcaidunrqzunpm",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// ____________________________usersignup___________________________________________________________
userRouter.post("/signup", async (req, res) => {
  const { name, email, password, location } = req.body;
  console.log(req.body);
  const presend_or_not = await UserModel.findOne({ email });

  try {
    bcrypt.hash(password, 5, async (err, secure_pass) => {
      if (err) {
        console.log(err);
        res.send({ msg: "error while registering" });
      } else {
        const presend_or_not = await UserModel.findOne({ email });
        if (presend_or_not) {
          res.send({ msg: "user already exist in the database" });
        } else {
          const user = new UserModel({
            name,
            email,
            password: secure_pass,
            location,
          });
          await user.save();
          res.send({ msg: '"User has been registered"', user });
          console.log(user);
          console.log(user.email);
          let otp = 1947;
          const mailOptions = {
            form: '"Verify your email" <deepak1812002@gmail.com>',
            to: user.email,
            subject: "verify your email...",
            html: `<h2>${user.name} ! Thanks for registering on our site</h2>
                     <h4>Please verify mail to continue <h4>
              `,
          };
          //  sending email
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log(
                "Verification mail sent to the users gmail account ",
                info.messageId
              );
            }
          });
        }
      }
    });
  } catch (error) {
    console.log("error");
    res.send("error in registered in the user");
    console.log(error);
  }
});
// _____________________________user__________login___________________________

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // let email =
    if (email == "Admin123@gmail.com" && password == "Admin") {
      let findadmin = UserModel.find({ email });
      if (findadmin) {
        res.send({ msg: "Admin login successfully" });
      } else {
        res.send({ msg: "wrong credential" });
      }
    } else {
      let user = await UserModel.find({ email });
      console.log(user);

      if (user.length > 0) {
        bcrypt.compare(password, user[0].password, (err, result) => {
          if (result) {
            let token = jwt.sign({ userID: user[0]._id }, "healthyme");
            res.send({ msg: "Login sucessful ", token: token, user });
          } else {
            res.send("Wrong credentials");
          }
        });
      } else {
        res.send({ msg: "Wrong credentials !! Please check your password or email" });
      }
    }
  } catch (error) {
    res.send("error");
  }
});

// --------------------------------original----------------
// dummy
// userRouter.post("/add/:id",authenticator,async(req,res)=>{
//   const {userID}=req.body
//   const data=await UserModel.findOne({_id:userID});

//   const para=req.params.id;
//   const validity=await ProductModel.findOne({_id:para});
//   console.log(validity)
//  if(validity){
//   data.purchase.push(para);
//   await data.save();
//   res.send({"msg":"data got added succ"})
//  }else{
//   return res.json("Invalid I'd")
//  }
// })


// userRouter.get("/check",authenticator,async (req,res)=>{
//   const {userID}=req.body
//   console.log(userID)
//   const data=await UserModel.findOne({_id:userID}).populate("purchase")
//   res.send(data)
// })

// original------------------

userRouter.post("/add/:id", authenticator, async (req, res) => {
  const { userID } = req.body
  const data = await UserModel.findOne({ _id: userID });

  const para = req.params.id;
  const validity = await AdminProductModel.findOne({ _id: para });
  console.log(validity)
  if (validity) {
    data.purchase.push(para);
    await data.save();
    res.send({ "msg": "data got added succ" })
  } else {
    return res.json("Invalid I'd")
  }
})


userRouter.get("/check", authenticator, async (req, res) => {
  const { userID } = req.body
  console.log(userID)
  const data = await UserModel.findOne({ _id: userID }).populate("purchase");

  res.send(data)
  console.log(data.purchase);
})

userRouter.patch("/update/check/:id", authenticator, async (req, res) => {
  const { userID } = req.body
  let para = req.params.id;
  console.log(userID)
  const data = await UserModel.updateOne(
    { _id: userID },
    { $pull: { "purchase": para } })

  res.send(data)
  console.log(data.purchase);
})

// MyModel.updateOne(
//   { _id: ObjectId("5f5d5e5c5d5e5f5c5d5e5f5c") },
//   { $pull: { "arrayFieldName": "valueToRemove" } })

// userRouter.get("/check",authenticator,async (req,res)=>{
//   const {userID}=req.body
//   console.log(userID)
//   const data=await UserModel.findOne({_id:userID}).populate("purchase");
//   res.send(data)
//   console.log(data.purchase);
// })

module.exports = { userRouter };


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2M2M5OGQ3ZDdhMWZiM2ExZWE1ZDliODIiLCJpYXQiOjE2NzQyOTAxNDJ9.7-cncVkDMoDT8BjT7O4GKAWv_QeK0530itXLWec2iLA

// api for the user post?
// localhost:9000/user/add/63c842a7864c66e04e779435
// api for the chcecking the data added by cx
// localhost:9000/user/check


// {
//   "Image": "https://img5.hkrtcdn.com/22258/prd_2225754-HealthKart-HK-Vitals-Omega-3-1000mg-with-180mg-EPA-and-120mg-DHA-90-capsules_c_s.jpg",
//   "Description": "HealthKart HK Vitals Fish Oil 1000mg with 180mg EPA and 120mg DHA, 60 capsules",
//   "Rating": "4.6",
//   "Price": 1500,
//   "Discount": 35,
//   "Category": "oil"
// }