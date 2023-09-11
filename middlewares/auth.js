const UnauthorizedError = require("../errors/unauthorized");
const jwt = require("jsonwebtoken");
const config = require("../config");
const userService = require('../api/users/users.service');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      throw "not token";
    }
    const decoded = jwt.verify(token, config.secretJwtToken);
    req.user = await userService.get(decoded.userId);
    console.log(req.user);
    next();
  } catch (message) {
    next(new UnauthorizedError(message));
  }
};
