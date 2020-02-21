const express = require("express");
var router = express.Router();
const user = require("../models/user.js");

router.get("/", function(req, res) {
  //Display error if there is, then reset it.
  req.TPL.login_error = req.session.login_error;
  req.session.login_error = "";

  res.render("login", req.TPL);
});

router.post("/attemptlogin", function(req, res) {
  user.getUsers(req.body.username, userNameCheck);

  function userNameCheck(array2) {
    if (array2.length > 0 && req.body.username == array2[0].username ) {

      function compare(passwordInputHash){
        if (passwordInputHash == array2[0].passwordHash) {
            req.session.username = req.body.username;
            res.redirect("/travel");
        }else{
          req.session.login_error = "Invalid password!";
          res.redirect("/login");
        }
      };

      function hash(callback){
        var passwordInputHash = require('crypto').createHash('sha256').update(req.body.password).digest("hex");
        callback(passwordInputHash);
      }

      hash(compare);

    }else{
      req.session.login_error = "Invalid username!";
      res.redirect("/login");
    }
  }
});

router.get("/logout", function(req, res) {
  delete req.session.username;
  res.redirect("/home");
});

module.exports = router;
