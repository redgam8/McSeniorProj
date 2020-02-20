const express = require('express');
var router = express.Router()
const user = require('../models/user.js')
const articles = require('../models/articles.js')


// Display the editors page
router.get("/", function(req, res)
{
	//fill array assigns the results to data1 array, then declares/calls fillarray2
	function fillArray(results)
	{
	  req.TPL.users = results;

		function fillArray2(results)
		{
			req.TPL.articles = results;
			
			//now that array1 and array2 are filled, res.render the page
			res.render("editors", req.TPL); 
		}
		//fillarray2 is called and fills a global array
		articles.getAllArticles(fillArray2)
	}
	//1. get users and fill a "req.TPL.users" array
    user.getAllUsers(fillArray);
});


router.get("/delete/:type/:id", function(req, res)
{	function shaftEm()
	{
		  user.getAllUsers(fillArray);
	}
		
	function fillArray(results)
	{
	  req.TPL.users = results;

		function fillArray2(results)
		{
			req.TPL.articles = results;
			
			//now that array1 and array2 are filled, res.render the page
			res.render("editors", req.TPL); 
		}
		//fillarray2 is called and fills a global array
		articles.getAllArticles(fillArray2)
	}
	//1. get users and fill a "req.TPL.users" array
    user.deleteContent(req.params.type,req.params.id,shaftEm);
	
});

module.exports = router;
