const jwt = require("jsonwebtoken");
const authenticator = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const decoded = jwt.verify(token, "healthyme");
    if (decoded) {
      const userID = decoded.userID;
      console.log(decoded);
      console.log(11)
      req.body.userID = userID;
      next();
    } else {
      res.send("Please login first");
      console.log('Please Login First form middlewares')

    }
  } else {
    res.send("Please Login First");
    console.log('Please Login First form middlewares')
  }
};
module.exports = { authenticator };
