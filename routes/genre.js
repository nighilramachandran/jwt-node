const Joi = require("joi");
const express = require("express");
const mongoose = require("mongoose");
const authToken = require("../middleware/auth");
const isAdmin = require("../middleware/admin");
const asyncMiddleware = require("../middleware/async");
const { Genre } = require("../models/genre");
const validateObjectId = require("../middleware/validateObjectId");

const router = express.Router();

router.get("/", async (req, res) => {
  const result = await Genre.find();
  res.status(200).send(result);
});
router.get("/:id", validateObjectId, async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  console.log("genre", req.params.id);

  if (!genre) return res.status(404).send("NO data found");
  res.status(200).send(genre);
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

router.delete("/", [authToken, isAdmin], async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.body.id);

  if (!genre)
    return res.status(404).send("Course with the given id is not found");

  res.status(200).send(genre);
});

module.exports = router;
