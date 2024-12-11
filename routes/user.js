const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const { validate, Users } = require("../models/user");
const asyncMiddleware = require("../middleware/async");

const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let user = await Users.findOne({ email: req.body.email });

  if (user) return res.status(400).send("User already registerd");

  user = new Users(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  const validUser = _.pick(user, ["_id", "name", "email"]);
  const token = user.getAuthenticationToken();

  res.header("x-auth-token", token).status(200).send(validUser);
});

module.exports = router;
