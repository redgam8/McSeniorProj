const express = require('express');
var router = express.Router();
const ArticlesModel = require('../models/articles.js');

// Display the members page
router.get("/", function(req, res)
{
  res.render("travel", req.TPL);
});

// Create an article if the form has been submitted
router.post("/submitroute", function(req, res)
{
	console.log("outputting contents of the body request");
	console.log(req.body);
 
  console.log(req.body);
});


router.get("/logout", function(req, res) {
  delete req.session.username;
  res.redirect("/");
});

module.exports = router;
