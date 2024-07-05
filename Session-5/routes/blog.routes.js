const express = require("express");

const{ getBlogs, createBlog, getLogById, getBlogById, getAuthor,deleteBlogById,updateBlogById } = require('../controllers/blogs.controller');
const verifyAuth = require('../middlewares/verifyAuth');
const verifyBodyType = require('../middlewares/verifyBodyType');

const router = express.Router();

router.get("/",getBlogs);
router.get("/author/:author",getAuthor);

router.get("/:id",getBlogById);
router.post("/",createBlog);
router.delete("/:id",deleteBlogById);
router.patch('/:id',verifyBodyType ,updateBlogById);

module.exports = router;