const express = require("express");
var router = express.Router();
const user = require("../models/user.js");

router.get("/", function (req, res)
{
	req.TPL.signup_error = req.session.signup_error;
	req.session.signup_error = "";

	res.render("signup", req.TPL);
}
);

router.post("/attemptsignup", function (req, res)
{
	function randomString(length, chars)
	{
		var result = "";
		for (var i = length; i > 0; --i)
			result += chars[Math.floor(Math.random() * chars.length)];
		return result;
	}

	var dbResArr2;
	var dbResArr1;
	var input = req.body;
	var useridx;

	function usernameCheck(input)
	{
		return new Promise(function (resolve, reject)
		{
			user.getUsersWithUsername(input.username, function (dbResArr1)
			{
				if (dbResArr1.length > 0)
				{
					reject("Username Duplicated!");
				}
				resolve(input);
			}
			);
		}
		);
	}

	function userIdCheckLoop(dbResArr1)
	{
		if (dbResArr1.length > 0)
		{
			console.log("input ID: ", useridx);
			console.log("return ID: ", dbResArr1[0].userid);
			console.log("key duplicated");
			useridx = randomString(8, "0123456789abcdefghijklmnopqrstuvwxyz");

			user.getidUserid(useridx, userIdCheckLoop);
		}
		else
		{
			console.log("Found the unique ID");
			input["useridx"] = useridx;
			input["passwordInputHash"] = require("crypto")
				.createHash("sha256")
				.update(input.password)
				.digest("hex"); ;
			user.createUser(input.useridx, input.username, input.passwordInputHash, input.fname, input.lname, input.email, input.phonenumber, function ()
			{
				req.session.login_ready = "User account created! Please Login.";
				res.redirect("/login");
			}
			);
		}
	}

	function userIdCheck(input)
	{
		return new Promise(function (resolve, reject)
		{
			useridx = randomString(8, "0123456789abcdefghijklmnopqrstuvwxyz");

			user.getidUserid(useridx, userIdCheckLoop);
		}
		);
	}

	usernameCheck(input)
	.then(userIdCheck(input))
	.catch(function (err)
	{
		req.session.signup_error = err;
		res.redirect("/signup");
	}
	);
}
);

module.exports = router;
