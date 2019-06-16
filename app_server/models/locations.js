const mongoose = require("mongoose");
const locationSchema = mongoose.Schema({
  name: String,
  address: String,
  rating: Number,
  facilities: [String]
});
