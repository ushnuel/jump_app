const ApiError = require("../../api_error");

class BaseController {
  static checkIfHeaderIsValid(req) {
    const token = req.headers["jump-auth-token"];

    if (!token || token !== process.env.JUMP_AUTH_TOKEN) {
      throw new ApiError("Invalid header token", 401);
    }
  }
}

module.exports = BaseController;
