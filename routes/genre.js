const Joi = require("joi");
const express = require("express");
const mongoose = require("mongoose");
const authToken = require("../middleware/auth");

const router = express.Router();

const Genre = mongoose.model(
  "genre",
  new mongoose.Schema({
    item: String,
    price: Number,
  })
);

router.get("/", async (req, res) => {
  try {
    const result = await Genre.find();
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
  }
});
router.get("/:id", (req, res) => {
  // let result = courses.find((c) => c.id === parseInt(req.params.id));
  // if (!result) res.status(404).send("NO data found");
  // res.status(200).send(result);
});

router.post("/", authToken, async (req, res) => {
  const schema = {
    item: Joi.string().min(3).required(),
    price: Joi.number().required(),
  };

  let result = Joi.validate(req.body, schema);

  if (result?.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  let course = new Genre({ item: req.body.item, price: req.body.price });
  course = await course.save();
  res.status(200).send(course);
});

module.exports = router;
