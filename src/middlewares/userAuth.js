const passport = require("passport");

/**
 * Middleware to check if the user is authenticated using JWT
 */
const userAuth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, JwtPayload, info) => {
    if (err || !JwtPayload) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.userId = JwtPayload.userId;
    next();
  })(req, res, next);
};

module.exports = userAuth;
