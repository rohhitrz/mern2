//connect to db

const mongoose = require("mongoose");
const Blog = require('../models/blog.model'); 

 

const getBlogs =  async (req,res)=>{
  try{
  res.send( await  Blog.find());
  }
  catch(err){
    res.status(500).send("something went wrong!");
  }

}

const getBlogById =async(req,res)=>{
  try{

  // console.log(req.params.id);
  // res.send(await Blog.find({_id:req.params.id}));
  res.send(await Blog.findById(req.params.id));
  }
  catch(err){
    res.status(404).send("something went wrong!");
  }
}

const getAuthor=async(req,res)=>{
  // console.log(req.params.author);
  try{
  let author = req.params.author;
  // author = author.toLowerCase();
  const blogs = await( Blog.find({authors: author}));
  if(blogs.length === 0){
    return res.status(404).send("Wrong name of author");
  }
  res.send(blogs);
  }
  catch(err){
    res.status(500).send("something went wrong!");
  } 
  

}

const createBlog =  async (req,res)=>{
    // console.log(req.body);
   const newBlog = new Blog(req.body);
   newBlog.save();
  res.status(201). send({id: newBlog._id}); 
 
};



module.exports={getBlogs,createBlog,getBlogById,getAuthor};