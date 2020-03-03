const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true, required: true },
  password: { type: String, required: true },
  profile: {
    name: { type: String, defualt: "" },
    picture: { type: String, default: "" }
  },
  adress: { type: String, default: "(Please update your adress)" }
});

module.exports = mongoose.model("User", UserSchema);
