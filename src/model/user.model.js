const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
  created_time: { type: Number, default: Date.now },
  updated_time: { type: Number, default: Date.now },
});

const users = mongoose.model("users", userSchema);
module.exports = users;
