const express = require("express");
const router = express.Router()
const adminToken = require("./schema")
const jwt = require("jsonwebtoken");
const timeAgo = require('javascript-time-ago');
const { resolveInclude } = require("ejs");


router.get("/getAdminToken", async (req, res) => {
     
})


module.exports = router