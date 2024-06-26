const express = require("express");

const{ getBlogs, createBlog, getLogById, getBlogById, getAuthor } = require('../controllers/blogs.controller');
const verifyAuth = require('../middlewares/verifyAuth');

const router = express.Router();

router.get("/",getBlogs);
router.get("/author/:author",getAuthor);

router.get("/:id",getBlogById);
router.post("/",createBlog);

module.exports = router;