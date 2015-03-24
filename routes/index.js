var express = require('express');
var app = express();
var router = express.Router();
var User = require('../models/user');
var path = require("path");

//app.use(express.static(path.join(__dirname, 'public')));


router.get('/', function(req, res) {	
	res.sendFile(path.join(__dirname, '../', 'public/views/index.html'));
});

router.post("/", function(req, res) {
	var user = new User({
		name: req.body.name
	});

	user.save(function(err, user) {
		res.redirect("/");
	});
});

module.exports = router;