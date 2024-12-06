const jwt = require("jsonwebtoken");
const config = require("congfig");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Token not found");
  try {
    const decoded = jwt.verify(token, config.get("vidly_jwtPrivateKey"));
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token");
  }
};
