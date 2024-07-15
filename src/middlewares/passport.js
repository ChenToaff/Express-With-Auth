const { Strategy } = require("passport-jwt");
const JWT_SECRET = process.env.JWT_SECRET;

const opts = {
  jwtFromRequest: (req) => req.cookies?.jwt,
  secretOrKey: JWT_SECRET,
};

module.exports = (passport) => {
  passport.use(
    new Strategy(opts, (JwtPayload, done) => {
      if (JwtPayload.userId) {
        return done(null, JwtPayload);
      }
      return done(null, false);
    })
  );
};
