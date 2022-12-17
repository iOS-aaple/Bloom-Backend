const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, requires: true },
  email: { type: String, requires: true },
  password: { type: String, requires: true },
  birthday: { type: String, requires: true },
  phoneNumber: { type: String },
});

module.exports = mongoose.model("Users", userSchema);
