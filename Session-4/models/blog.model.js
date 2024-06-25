const mongoose = require("mongoose");
const blogSchema = require("../schemas/blogSchema");
const blogModel = mongoose.model("Blog", blogSchema); 

module.exports = blogModel