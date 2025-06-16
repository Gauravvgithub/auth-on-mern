const mongoose = require("mongoose");

const mongo_url = process.env.MONGO_CONN;

mongoose.connect(mongo_url)
  .then(() => {
    console.log(`MongoDB Connected Successfully`);
  })
  .catch((error) => {
    console.log(`MongoDn Connection Error: ${error}`);
  });
