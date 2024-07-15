const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { ValidationError } = require("../utils/ApiError");
const JWT_SECRET = process.env.JWT_SECRET;

const loginUser = async (user, password) => {
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new ValidationError("Incorrect password.");

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
    expiresIn: "1 day",
  });

  return `Bearer ${token}`;
};

module.exports = {
  loginUser,
};
