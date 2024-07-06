const { types, required, string } = require("joi");
const mongoose = require("mongoose");
const validator = require("validator");


const authorSchema= new mongoose.Schema({
  fullname: {type:String,maxlength:25},
  twitterHandle: {type:String},
  email: {
    type:String, 
    maxlength:50, 
    required:true, 
    validate:(value)=>validator.isEmail(value)},
  image:{
    type:String,
    validate:(value)=>validator.isURL(value)
  },
});

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true},
  author: { type: [authorSchema] },
  content: { type: String, default: "" },
  publishedAt: { type: Date, default: null },
},
{timestamps:true});


// const blogSchema = mongoose.Schema({
//   title: String, //Title is string
//   authors: [String], //Authors is an array of strings
//   content: String, //Content is string
//   publishedAt: Date, //publishedAt is Date
// });






module.exports = blogSchema;