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

router.post("/attemptsignup", function(req, res) {
  user.getUsers(req.body.username, userNameCheck);

  function userNameCheck(array2) {
    if (array2.length > 0) {
      req.session.signup_error = "Username Duplicated!";
      res.redirect("/signup");

    } else {
      function addUser(passwordInputHash){
        user.createUser(req.body.username, passwordInputHash, req.body.name, req.body.email, req.body.role);
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

// router.get("/logout", function(req, res) {
//   delete req.session.username;
//   res.redirect("/home");
// });

module.exports = router;
