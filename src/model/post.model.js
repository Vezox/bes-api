const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  type: { type: String, values: ["news", "event"], required: true },
  descriptions: String,
  content: String,
  author: { type: Schema.Types.ObjectId, ref: "users" },
  image: { type: Schema.Types.ObjectId, ref: "images" },
  url_image: {type: String},
  date: { type: Number, default: Date.now },
  address: String,
  view: { type: Number, default: 0 },
  created_time: { type: Number, default: Date.now },
  updated_time: { type: Number, default: Date.now },
  deleted_time: { type: Number }
});


postSchema.index({ slug: 1 }, { unique: true })

const posts = mongoose.model("posts", postSchema);
module.exports = posts;