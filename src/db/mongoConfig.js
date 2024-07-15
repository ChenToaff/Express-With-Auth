const mongoose = require("mongoose");
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) throw new Error("MONGO_URI is not defined!");

const connectMongo = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

module.exports = connectMongo;
