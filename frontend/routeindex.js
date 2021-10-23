const {Router} = require("express");
const router = Router();

const verify = require("./verifyAccess");
// var multer = require("multer");
// var fs = require("fs");
// var path = require("path");
var jwt = require("jsonwebtoken");

router.get("/", verify, async function(req,res){
    res.end("JA");
})