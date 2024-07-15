require("dotenv").config();
const express = require("express");
const connectMongo = require("./db/mongoConfig");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const passport = require("passport");
const errorHandler = require("./middlewares/errorHandler");

require("./middlewares/passport")(passport);

connectMongo();

const PORT = process.env.PORT || 8080;
const app = express();

// Middlewares
app.use(cookieParser());
app.use(bodyParser.json());
app.use(passport.initialize());

// User Router Middleware
app.use("/api/auth", require("./routes/authRoutes"));
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
