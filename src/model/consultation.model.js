const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const consultationSchema = new Schema({
  full_name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  address: { type: String },
  object: { type: String },
  targets: { type: Array, items: { type: String } },
  address: { type: String },
  checked: { type: Boolean, default: false },
  created_time: { type: Number, default: Date.now },
  updated_time: { type: Number, default: Date.now },
  deleted_time: { type: Number }
});

const consultations = mongoose.model("consultations", consultationSchema);
module.exports = consultations;
