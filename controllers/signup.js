const express = require('express');
var router = express.Router()
const ArticlesModel = require('../models/articles.js')
const user = require('../models/user.js')




// Displays the login page
router.get("/", function(req, res)
{
  // if we had an error during form submit, display it, clear it from session
  req.TPL.signup_error = req.session.signup_error;
  req.TPL.signup_success = req.session.signup_success;
  req.session.signup_error = "";
  req.session.signup_success = "";

  // render the login page
  res.render("signup", req.TPL);
});

// Attempts to login a user
// - The action for the form submit on the login page.
router.post("/attemptsignup", function(req, res)
{
   //user.getUsers(req.body.username,userNameCheck);
     
  // is the username and password OK?
  if (req.body.username.length >= 1 && req.body.password.length >= 1)
  {
    // set a session key username to login the user
    //req.session.username = req.body.username;
	user.createUser(req.body.username,req.body.password);
	req.session.signup_success = 'User account created!  <a href ="/login">Login</a> to access your new account';
	res.redirect("/signup");
    // re-direct the logged-in user to the members page
    //res.redirect("/members");
  }
  else
  {
    // if we have an error, reload the login page with an error
    req.session.signup_error = "Username/password cannot be blank!";
    res.redirect("/signup");
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
