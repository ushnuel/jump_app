const crypto = require("crypto");
const Cache = require("../../models/Cache");
const ApiError = require("../../../api_error");

module.exports = async (key) => {
  if (!key) {
    throw new ApiError("Key is required");
  }

  const cacheMaxSize = process.env.CACHE_MAX_SIZE;

  const cacheObject = await Cache.findOne({}).exec();
  const cache = cacheObject.cache_data;
  const cacheSize = Object.keys(cache).length;

  if (!cache[key]) {
    console.log("Cache miss");
    cache[key] = { value: generateRandomString() };

    // A cacheMaxSize is set in the .env file. If the length of the cache object is greater than the cacheMaxSize, remove the oldest cache entry.
    // This is done by getting the keys of the cache object, and deleting the first key, which is the oldest.

    if (cacheSize >= cacheMaxSize) {
      const keys = Object.keys(cache);
      const oldestKey = keys[0];
      delete cache[oldestKey];
    }

    cache[key]["ttl"] = new Date().getTime();
    await Cache.updateOne({ cache_data: cache }).exec();

    return { value: cache[key].value };
  }

  console.log("Cache hit");

  const ttl = cache[key].ttl;
  const currentTime = new Date().getTime();
  const expiryTime = currentTime - ttl;

  // expiry time set to 2 minutes
  if (expiryTime > process.env.SET_TTL) {
    cache[key].value = generateRandomString();
    cache[key].ttl = new Date().getTime();
    await Cache.updateOne({ cache_data: cache }).exec();
  }

  return { value: cache[key].value };
};

function generateRandomString() {
  return crypto.randomBytes(15).toString("base64");
}
