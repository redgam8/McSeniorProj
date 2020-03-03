const express = require("express");
var router = express.Router();
const user = require("../models/user.js");

router.get("/", function(req, res) {
  req.TPL.signup_error = req.session.signup_error;
  req.session.signup_error = "";

  res.render("signup", req.TPL);
});

router.post("/attemptsignup", function(req, res) {
  function randomString(length, chars) {
    var result = "";
    for (var i = length; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }

  var dbResArr2;
  var input = req.body;

  function usernameCheck(input) {
    return new Promise(function(resolve, reject) {
      user.getUsersWithUsername(input.username, function(dbResArr1) {
        if (dbResArr1.length > 0) {
          reject("Username Duplicated!");
        }
        resolve(input);
      });
    });
  }

    function usernameCheck(input) {
      return new Promise(function(resolve, reject) {
        user.getUsersWithUsername(input.username, function(dbResArr1) {
          if (dbResArr1.length > 0) {
            reject("Username Duplicated!");
          }
          resolve(input);
        });
      });
    }

  function userIdCheck(input) {
    return new Promise(function(resolve, reject) {
      var useridx = randomString(8, "0123456789abcdefghijklmnopqrstuvwxyz");
      var test = 0;

      user.getidUserid(req, function(dbIDs) {
        for (var i = 0; i < dbIDs.length; i++) {
          if (useridx == dbIDs[i].userid) {
            useridx = randomString(8, "0123456789abcdefghijklmnopqrstuvwxyz");
            i = 0;
            console.log("key duplicated");
          } else {
            console.log("Found the unique ID");
            input["useridx"] = useridx;
            i=dbIDs.length;
            resolve(input);
          }
        }
      });
    });
  }

  function convertHash(input) {
    return new Promise(function(resolve, reject) {
      var passwordInputHash = require("crypto")
        .createHash("sha256")
        .update(input.password)
        .digest("hex");
      input["passwordInputHash"] = passwordInputHash;
      resolve(input);
    });
  }

  function addUser(input) {
    return new Promise(function(resolve, reject) {
      user.createUser(
        input.useridx,
        input.username,
        input.passwordInputHash,
        input.fname,
        input.lname,
        input.email,
        input.phonenumber
      );
    });
  }

  function backToLogin() {
    return new Promise(function(resolve, reject) {
      req.session.login_ready = "User account created! Please Login.";
      res.redirect("/login");
    });
  }

  usernameCheck(input)
    .then(userIdCheck(input))
    .then(convertHash(input))
    .then(addUser(input))
    .then(backToLogin)
    .catch(function(err) {
      req.session.signup_error = err;
      res.redirect("/signup");
    });
});

module.exports = router;
