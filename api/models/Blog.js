const mongoose = require("mongoose");
const { Schema } = mongoose;

const blogSchema = new Schema({
  title: { type: String, required: true },
});

const Blog = mongoose.model("blog", blogSchema);

module.exports = Blog;
