const express = require("express");
const { getUsers, searchUser, getUserByUserId } = require("../controllers/users.controller");
const validateUserSearch = require("../middlewares/validators/validateUserSearch");
const verifyAuth = require("../middlewares/verifyAuth");

const router = express.Router();


router.get('/',getUsers);

router.get("/search",verifyAuth,  validateUserSearch, searchUser);

router.get("/:uuid", getUserByUserId); 

module.exports = router;


