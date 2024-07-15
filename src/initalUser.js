require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

const INITIAL_USER_EMAIL = process.env.INITIAL_USER_EMAIL;
const INITIAL_USER_PASSWORD = process.env.INITIAL_USER_PASSWORD;
const INITIAL_USER_NAME = process.env.INITIAL_USER_NAME;
const MONGO_URI = process.env.MONGO_URI;

if (
  !INITIAL_USER_EMAIL ||
  !INITIAL_USER_PASSWORD ||
  !INITIAL_USER_NAME ||
  !MONGO_URI
) {
  throw new Error("Missing env variables!");
}

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const createInitialUser = async () => {
  try {
    const existingUser = await User.findOne({ email: INITIAL_USER_EMAIL });
    if (existingUser) {
      console.log("Initial user already exists");
    } else {
      const user = new User({
        email: INITIAL_USER_EMAIL,
        password: INITIAL_USER_PASSWORD,
        name: INITIAL_USER_NAME,
      });
      await user.save();
      console.log("Initial user created");
    }
  } catch (error) {
    console.error("Error creating initial user:", error);
  } finally {
    mongoose.connection.close();
  }
};

createInitialUser();
