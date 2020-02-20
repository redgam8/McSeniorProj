const express = require('express');
var router = express.Router()
const ArticlesModel = require('../models/articles.js')
const user = require('../models/user.js')




// Displays the login page
router.get("/", function(req, res)
{
  // if we had an error during form submit, display it, clear it from session
  req.TPL.login_error = req.session.login_error;
  req.session.login_error = "";

  // render the login page
  res.render("login", req.TPL);
});

// Attempts to login a user
// - The action for the form submit on the login page.
router.post("/attemptlogin", function(req, res)
{
	user.getUsers(req.body.username,userNameCheck);
	   
	   
	   function userNameCheck2(array2)
	   
	   {
		   console.log(array2.length);
		   if(array2 == undefined)
		   {
			   
			   console.log("broken");
		   }
		   
	   }
	function userNameCheck (array2){
		// is the username and password empty?
		if (req.body.username == "" || req.body.password== "")
		{
			
			// if we have an error, reload the login page with an error
			req.session.login_error = "Invalid username and/or password!";
			res.redirect("/login");
				  
				
		}
		
		else if (array2.length == 0)
		{
			req.session.login_error = "Invalid username and/or password!";
			res.redirect("/login");
			
		}
		
		else
		{
			if (req.body.username == array2[0].username && req.body.password == array2[0].password )
			{
			// set a session key username to login the user
			req.session.username = req.body.username;
			req.session.level = array2[0].level;

			// re-direct the logged-in user to the members page
			
				if(req.session.level=="editor")
				{
						res.redirect("/editors")
					
				}
				else if(req.session.level=="member")
				{
						res.redirect("/members")
					
				}
			}
		
			else 
			{
				// if we have an error, reload the login page with an error
				req.session.login_error = "Invalid username and/or password!";
				res.redirect("/login");
			}	
			
		}
		  
	}
});

// Logout a user
// - Destroys the session key username that is used to determine if a user
// is logged in, re-directs them to the home page.
router.get("/logout", function(req, res)
{
  delete(req.session.username);
  res.redirect("/home");
});

module.exports = router;
