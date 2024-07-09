const Blog= require('../models/blog.model');

class BlogService{
 finalAllBlogs= async ()=>Blog.find();
 findBlogByIdHelper= async (id) => Blog.findById(id);
 createBlogDocument= async(body)=> Blog.create(body);
 deleteBlogDocumentById= async(id)=> Blog.findOneAndDelete({_id:id});
 updateBlogDocumentById= async(id,body)=> Blog.findOneAndUpdate({_id:id},body, {new:true});
 findBlogByTitleAndAuthor= async(title,author)=>Blog.find({
    $or:[
        {title:{ $regex: new RegExp(title, "i")}},
        {author: { $elemMatch:{email:author}}},

    ],
});

}

module.exports= BlogService;