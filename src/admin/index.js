const express = require("express");
const router = express.Router()
const adminToken = require("./schema")
const jwt = require("jsonwebtoken");
const timeAgo = require('javascript-time-ago');
const { resolveInclude } = require("ejs");


router.get("/getAdminToken", async (req, res) => {

    const arrr = [3, 6, 2, 9, -1, 10]
    sizee = arrr.length / 2
    const chunk = (arr, size) => arr.reduce((acc, e, i) =>
        (i % size ? acc[acc.length - 1].push(e) : acc.push([e]), acc), []);
    const saved = chunk(arrr, sizee)
    const firstSum = saved[0].reduce((a, b) => a + b, 0)
    secondSum = saved[1].reduce((a, b) => a + b, 0)
    console.log(firstSum)
    console.log(secondSum)
 
     
})


module.exports = router