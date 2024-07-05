const express = require("express");

const{ getBlogs, createBlog, getLogById, getBlogById, getAuthor,deleteBlogById } = require('../controllers/blogs.controller');
const verifyAuth = require('../middlewares/verifyAuth');

const router = express.Router();

router.get("/",getBlogs);
router.get("/author/:author",getAuthor);

router.get("/:id",getBlogById);
router.post("/",createBlog);
router.delete("/:id",deleteBlogById);

module.exports = router;