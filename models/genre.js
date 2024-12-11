const mongoose = require("mongoose");

const genreShema = new mongoose.Schema({
  item: String,
  price: Number,
});

const Genre = mongoose.model("genre", genreShema);

module.exports.Genre = Genre;
