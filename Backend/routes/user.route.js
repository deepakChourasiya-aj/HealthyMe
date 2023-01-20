const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const userRouter = express.Router();
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const { UserModel } = require("../model/usermodel");
const { authenticator } = require("../middlewares/authenticator.middlewares");
const { ProductModel } = require("../model/product.model");

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
// _____________________________user__________login_____________________________________________

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
            res.send({ msg: "Login sucessful ", token: token });
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
module.exports = { userRouter };
