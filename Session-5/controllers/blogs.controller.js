//connect to db

const mongoose = require("mongoose");
const Blog = require('../models/blog.model'); 

 

const getBlogs =  async (req,res)=>{
  res.send( await  Blog.find());

}

const getBlogById =async(req,res)=>{

  // console.log(req.params.id);
  res.send(await Blog.find({_id:req.params.id}));
}

const getAuthor=async(req,res)=>{
  // console.log(req.params.author);
  const author = req.params.author;
  const blogs = await( Blog.find({authors: author}));
  res.send(blogs);
  

}

const createBlog =  async (req,res)=>{
    // console.log(req.body);
   const newBlog = new Blog(req.body);
   newBlog.save();
  res.status(201). send({id: newBlog._id}); 
 
};



module.exports={getBlogs,createBlog,getBlogById,getAuthor};