const jwt = require("jsonwebtoken");
const authenticator = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const decoded = jwt.verify(token, "healthyme");
    if (decoded) {
      const userID = decoded.userID;
      console.log(decoded);
      req.body.userID = userID;
      next();
    } else {
      res.send("Please login first");
    }
  } else {
    res.send("Please Login First");
  }
};
module.exports = { authenticator };
