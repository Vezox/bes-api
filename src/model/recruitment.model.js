const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recruitmentSchema = new Schema({
  full_name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  current_salary: { type: Number},
  expected_salary: { type: Number},
  file: { type: String, required: true },
  checked: { type: Boolean, default: false },
  created_time: { type: Number, default: Date.now },
  updated_time: { type: Number, default: Date.now },
  deleted_time: { type: Number }
});

const recruitment = mongoose.model("recruitment", recruitmentSchema);
module.exports = recruitment;
