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
  // res.send(await Blog.findById(req.params.id));
  // if(Blog==null){
  //   return res.send({message:"could not find blog with this id"});
  // }

  const reqBlog = await Blog.findById({_id:req.params.id});
  if(reqBlog==null){
    return res.status(404).json({message:"could not find a blog by this Id"});
  }
  res.json(reqBlog);
}
  catch(err){
    res.status(404).send("something went wrong, possibly wrong Id!");
  }
}

const findBlogByHelper= async (id)=>{
  return await Blog.findById(id);
  
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

const createBlog = async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    // const newBlog = new Blog(req.body);
    // await newBlog.save();
    res.status(201).json({ id: newBlog._id });
    console.log("blog created");
  } catch (error) {
    console.log(error);
    if (error.code === 11000)
      return res.status(400).json({
        message:
          "A blog with this title already exists. Please use a unique title",
      });
    res
      .status(500)
      .json({ message: "Oops! Something went wrong. Please try again" });
  }
};


const deleteBlogById= async(req,res)=>{
  try{
  const reqDeleteBlog=  await Blog.findOneAndDelete({_id:req.params.id});
  // return res.status(204).send({message:"blog deleted Sucessfully!!"});  //here no requirement of sending message when use status code 204
  return res.sendStatus(204);
  }
  catch(error){
  console.log(error);
    return res.status(201).send({message:"cannot delete  blog with this ID"});
  }

}


module.exports={getBlogs,createBlog,getBlogById,getAuthor,deleteBlogById};