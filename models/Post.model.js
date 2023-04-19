const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema;
const PostSchema = new Schema({
  userId: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("Post", PostSchema);
