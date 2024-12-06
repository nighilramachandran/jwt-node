const Joi = require("joi");
const express = require("express");
const bcrypt = require("bcrypt");
const { Users } = require("../models/user");
const _ = require("lodash");
const asyncMiddleware = require("../middleware/async");

const router = express.Router();

router.post(
  "/",
  asyncMiddleware(async (req, res) => {
    const { error } = validateAuth(req.body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    let auth = await Users.findOne({ email: req.body.email });
    if (!auth) return res.status(400).send("Invalid username or password");

    let valid = await bcrypt.compare(req.body.password, auth.password);

    if (!valid) return res.status(400).send("Invalid username or password");

    const token = auth.getAuthenticationToken();
    return res.status(200).send(token);
  })
);

const validateAuth = (req) => {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  };
  return Joi.validate(req, schema);
};

module.exports = router;
