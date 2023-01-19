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
const { userProductRouter } = require("./routes/product.route");
const { AdminProductModel } = require("./model/AdminProduct");
const { adminRoute } = require("./routes/admin.route");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/", (req, res) => {
  res.send("hii okk");
});

app.use("/admin", adminRoute);

app.use("/user", userRouter);

app.use(authenticator);
// authenticator for only for the logged in people -------
app.use("/", userProductRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log(`connected to DB ${process.env.port}`);
  } catch (error) {
    console.log("erro");
    console.log(error);
  }
});

// {
//     "Image":"https://img5.hkrtcdn.com/22823/prd_2282294-MuscleBlaze-Super-Gainer-XXL-11-lb-Chocolate_c_s.jpg",
//     "Description":"great energy booster",
//     "Rating":"4",
//     "Price":456,
//     "Discount":45,
//     "Category":"fat"
//   }
