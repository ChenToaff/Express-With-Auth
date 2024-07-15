const User = require("../models/User");
const { NotFoundError, ValidationError } = require("../utils/ApiError");

const getUserById = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new NotFoundError("User not found.");
  }
  return user;
};

const getUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFoundError("User not found.");
  }
  return user;
};

const getAllUsers = async () => {
  return await User.find({}, { password: 0, __v: 0 });
};

const changePassword = async (userId, password) => {
  const result = await User.updateOne({ _id: userId }, { $set: { password } });
  if (result.nModified === 0) {
    throw new NotFoundError("User not found.");
  }
  return result;
};

const createUser = async (user) => {
  // Validate the email and phone atomically
  const existingUser = await User.findOne({
    $or: [{ email: user.email }, { phone: user.phone }],
  });

  if (existingUser) {
    throw new ValidationError("User already exists");
  }

  const newUser = new User(user);
  await newUser.save();
  return newUser;
};

const deleteUser = async (email) => {
  const user = await User.findOneAndDelete({ email });
  if (!user) {
    throw new NotFoundError("User not found.");
  }
  return user;
};

const updateUser = async (userId, updateData) => {
  const user = await User.findOneAndUpdate(
    { _id: userId },
    { $set: updateData },
    { new: true } // Return the updated document
  );
  if (!user) {
    throw new NotFoundError("User not found.");
  }
  return user;
};

module.exports = {
  getAllUsers,
  changePassword,
  createUser,
  deleteUser,
  updateUser,
  getUserById,
  getUserByEmail,
};
