const authService = require("../services/authService");
const userService = require("../services/userService");
const asyncHandler = require("../middlewares/asyncHandler");

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await userService.getUserByEmail(email);
  const token = await authService.loginUser(user, password);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000, // (1 day)
  });

  res.status(200).json({ message: "Login success" });
});

const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token");
  res.json({ message: "You have been logged out" });
});

module.exports = {
  login,
  logout,
};
