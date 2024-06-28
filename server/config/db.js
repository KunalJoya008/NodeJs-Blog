const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(console.log("MongoDB Connected"))
    .catch((err) => {
      console.log("Error", err);
    });
};

module.exports = connectDB;
