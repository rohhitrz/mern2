const mongoose = require("mongoose");


const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  author: { type: [String] },
  content: { type: String, default: "" },
  publishedAt: { type: Date, default: null },
});


// const blogSchema = mongoose.Schema({
//   title: String, //Title is string
//   authors: [String], //Authors is an array of strings
//   content: String, //Content is string
//   publishedAt: Date, //publishedAt is Date
// });






module.exports = blogSchema;