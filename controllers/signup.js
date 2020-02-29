const express = require("express");
var router = express.Router();
const user = require("../models/user.js");

router.get("/", function(req, res) {
  req.TPL.signup_error = req.session.signup_error;
  req.TPL.login_error = req.session.login_error;
  req.session.signup_error = "";
  req.session.login_error = "";

  res.render("signup", req.TPL);
});
//Factor this code to use callback chaining > username check > user id check > user add
router.post("/attemptsignup", function(req, res) {
	//user.getUsers(req.body.username, userNameCheck);
	
	function randomString(length, chars) {
				var result = '';
				for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
				return result;
			}
			
 var useridx = randomString(8, '0123456789abcdefghijklmnopqrstuvwxyz');
		 
	user.getidUserid(useridx, useridcheck2);
	console.log("useridx= ",useridx);

			
	 function useridcheck2(array3) {
		 console.log(array3.length);
		// array3=0;
		if (array3.length > 0) {
			req.session.signup_error = "Key Duplicated!";
		 var useridx = randomString(8, '0123456789abcdefghijklmnopqrstuvwxyz');
		 
		 console.log("useridx=",useridx, " is duplicated");
		useridcheck2(useridx);



		} else 
		{		
			
			console.log("It seems okay");
			user.getUsers(req.body.username, userNameCheck);
		} 
	}
	  function userNameCheck(array2) {
		if (array2.length > 0) {
		  req.session.signup_error = "Username Duplicated!";
		  res.redirect("/signup");




		} else 
		{		
			
		
			function addUser(passwordInputHash){
				user.createUser(useridx, req.body.username, passwordInputHash, req.body.fname,req.body.lname, req.body.email, req.body.phonenumber);
				req.session.login_error = "User account created! Please Login.";
				res.redirect("/login");
			};
			function hashSignup(callback){
				passwordInputHash = require('crypto').createHash('sha256').update(req.body.password).digest("hex");
				callback(passwordInputHash);
			}
				hashSignup(addUser);

		}
	}
});

module.exports = router;
