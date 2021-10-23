const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema(
  {
    fName: {
      type: String,
      required: true,
      trim: true,
    },
    lName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    priv: {
      type: String,
      default: "user",
    },
    createdAt: {
      type: String,
      default: "N/F",
    },
    img: {
      type: String,
      default: "N/F",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = userSchema;
