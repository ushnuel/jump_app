const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const CacheSchema = new Schema(
  {
    cache_data: {},
  },
  { timestamps: true }
);

module.exports = Mongoose.model("Cache", CacheSchema);
