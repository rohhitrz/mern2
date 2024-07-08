//connect to db
const {finalAllBlogs,findBlogByIdHelper,createBlogDocument,deleteBlogDocumentById,updateBlogDocumentById,findBlogByTitleAndAuthor}= require('../services/blogs.service');

const mongoose = require("mongoose");
const Blog = require('../models/blog.model'); 
const { message, regex } = require("../schemas/userSearch.schema");

 

const getBlogs =  async (req,res)=>{
  try{
  // res.send( await  Blog.find());  
  const blogs= await finalAllBlogs();
  res.send(blogs);
  }
  catch(err){
    res.status(500).json({message: "oops not able to get all the blogs"});
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
    const newBlog = await createBlogDocument(req.body);
    // console.log(newBlog);
    // const newBlog = new Blog(req.body);
    // await newBlog.save();
    // console.log(newBlog._id );
    res.status(201).json({ id: newBlog._id });
    console.log("blog created");
  }catch (error) {
    console.log(error.message);
    if (error.code === 11000)
      return res.status(400).json({
        message:
          "A blog with this title already exists. Please use a unique title",
      });
    res
      .status(500)
      .json({ message: error.message});
  } 
};


const deleteBlogById= async(req,res)=>{
  try{
  // const reqDeleteBlog=  await Blog.findOneAndDelete({_id:req.params.id});
  // return res.status(204).send({message:"blog deleted Sucessfully!!"});  //here no requirement of sending message when use status code 204
  const reqBlog= await findBlogByIdHelper(req.params.id);
  if(reqBlog==null){
    res.status(404).json({message: "could not find a blog with given Id"});
  }
  await deleteBlogDocumentById(req.params.id);
  return res.sendStatus(204);
  }
  catch(error){
  console.log(error);
    return res.status(201).send({message:"cannot delete  blog with this ID"});
  }

}

const updateBlogById=async(req,res)=>{
  try{
  const reqBlog= findBlogByIdHelper(req.params.id);
  if(reqBlog ===null){
    res.status(404).json({message:"could not find a blog with given id"});
  }
  const updatedBlog=await updateBlogDocumentById(req.params.id,req.body);
  res.status(200).json(updatedBlog);
  }
  catch(error){
    console.log(error);
  }

}

const searchBlogs=async(req,res)=>{
  const {title,author}= req.query;
  
  try{
    findBlogByTitleAndAuthor(title,author);
    res.send(blogs);
}
  catch(error){
    console.log(error);
    return res.status(404).json({message:"could not find the blog with given title or author name"});
  }
}


module.exports={getBlogs,createBlog,getBlogById,getAuthor,deleteBlogById,updateBlogById,searchBlogs};