const express = require("express");
const { getUsers, searchUser, getUserByUserId } = require("../controllers/users.controller");

const router = express.Router();


router.get('/',getUsers);

router.get("/search", searchUser);

router.get("/:uuid", getUserByUserId); 

module.exports = router;


