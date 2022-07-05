const Cache = require("../services/cache");
const BaseController = require("./base_controller");

class CacheController extends BaseController {
  static async getCache(req, res, next) {
    try {
      super.checkIfHeaderIsValid(req);

      const key = req.query.key;
      const data = await Cache.GetCache(key);

      res.status(200).json({
        message: "Cache retrieved",
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CacheController;
