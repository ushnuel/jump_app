const mongoose = require("mongoose");
const connectDB = require("./api/config/db");
const Cache = require("./api/models/Cache");

const seedData = async () => {
  const currentTime = new Date().getTime();

  const caches = [
    {
      cache_data: {
        key: {
          value: "cache_value",
          ttl: currentTime,
        },
        key1: {
          value: "cache_value_1",
          ttl: currentTime,
        },
        key2: {
          value: "cache_value_2",
          ttl: currentTime,
        },
        key3: {
          value: "cache_value_3",
          ttl: currentTime,
        },
        key4: {
          value: "cache_value_4",
          ttl: currentTime,
        },
        key5: {
          value: "cache_value_5",
          ttl: currentTime,
        },
      },
    },
  ];

  connectDB();

  await Cache.deleteMany({}).exec();
  await Cache.insertMany(caches);
};

seedData().then(() => {
  mongoose.connection.close();
  console.log("Data seeded successfully");
});

module.exports = seedData;
