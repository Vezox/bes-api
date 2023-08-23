const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const franchiseSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  province: { type: String },
  description: { type: String },
  created_time: { type: Number, default: Date.now },
  checked: { type: Boolean, default: false },
});

const franchises = mongoose.model("franchises", franchiseSchema);
module.exports = franchises;
