const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  url: { type: String, required: true },
  public_id: { type: String, required: true },
  type: { type: String, required: true },
  descriptions: { type: String },
  created_time: { type: Number, default: Date.now },
});

const images = mongoose.model("images", imageSchema);
module.exports = images;
