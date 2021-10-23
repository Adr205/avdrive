const mongoose = require("mongoose");
const properties = require("./properties");


const dbURL = properties.DB;

module.exports = () => {
  mongoose
    .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((db) => console.log("db connected"))
    .catch((err) => console.log(err));

  process.on("SIGINT", () => {
    mongoose.connection.close(() => {
      console.log(`Mongo is disconnected`);
      process.exit(0);
    });
  });
};
