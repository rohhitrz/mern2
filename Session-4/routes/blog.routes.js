const express = require("express");

const{ getBlogs, createBlog } = require('../controllers/blogs.controller');
const verifyAuth = require('../middlewares/verifyAuth');

const router = express.Router();

router.get("/",getBlogs);
router.post("/",createBlog);

module.exports = router;
