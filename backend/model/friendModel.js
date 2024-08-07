const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FriendSchema = new Schema({
  id: { type: String },
  name: { type: String },
  image: { type: String },
  balance: { type: Number },
});
// FriendSchema.index("id")

let Friend = mongoose.model("Friend", FriendSchema);

module.exports = Friend;
