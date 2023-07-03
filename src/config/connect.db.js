const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.DB_URL);
    if (connect) console.log("🚀 DB connected 🚀");
  } catch (error) {
    console.error(error.message);
  }
};
module.exports = connectDB;
