module.exports = function (req, res, next) {
  // 400 bad request
  // 401 unauthrised
  // 403 forbidden
  if (!req.user.isAdmin) return res.status(403).send("Access denied");
  next();
};
