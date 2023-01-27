const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: false,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    images: [{ title: { type: String }, img: { type: String } }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = model("User", userSchema);

module.exports = User;
