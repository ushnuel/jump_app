const express = require("express");
const router = express.Router();

router.get("/", async (_, res) => {
  res.status(200).json({
    message: "Hello!",
    data: {
      platform: "Welcome to Jump API",
      version: "1.0",
    },
  });
});

const intermidiaryController = require("../../controllers/cache_controller");

router.get("/caches", intermidiaryController.getCache);

module.exports = router;
