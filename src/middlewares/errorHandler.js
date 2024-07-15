const { ApiError } = require("../utils/ApiError");

function errorHandler(error, req, res, next) {
  if (error instanceof ApiError) {
    res.status(error.statusCode).json({ message: error.message });
  } else {
    console.log(error);
    res.status(500).json({ message: "Internal server Error" });
  }
}

module.exports = errorHandler;
