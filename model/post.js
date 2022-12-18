const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: { type: String, requires: true },
  created_At: { type: String, requires: true },
  ownerID: { type: String, requires: true },
  content: { type: String },
});

module.exports = mongoose.model("Posts", postSchema);
