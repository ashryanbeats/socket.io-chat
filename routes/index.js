var express = require('express');
var app = express();
var router = express.Router();
var User = require('../models/user');
var path = require("path");

//app.use(express.static(path.join(__dirname, 'public')));


router.get('/', function(req, res) {
	console.log("HERE!, router.get");
	console.log(req.body);
	// console.log();
	// console.log(view);
	console.log(__dirname + "/../public" + "/views/");
	res.sendFile(__dirname + "../public" + "/views/");
});

router.post("/", function(req, res) {
	console.log("HERE!");
	console.log(req.body);
});

module.exports = router;