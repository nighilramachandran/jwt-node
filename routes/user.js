const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { validate, Users } = require("../models/user");

const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  //   let user = Users.findOne({ email: req.body.email });

  //   if (user) return res.status(400).send("User already registerd");

  let user = new Users(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  res.status(200).send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
