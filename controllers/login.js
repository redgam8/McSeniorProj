const express = require("express");
var router = express.Router();
const user = require("../models/user.js");

router.get("/", function(req, res) {
  //Display error if there is, then reset it.
  req.TPL.login_error = req.session.login_error;
  req.TPL.login_ready = req.session.login_ready;
  req.session.login_error = "";
  req.session.login_ready = "";

  res.render("login", req.TPL);
});

router.post("/attemptlogin", function(req, res) {
  var input = req.body;

  function compare(input) {
    return new Promise(function(resolve, reject) {
      user.getUsersWithUsername(input.username, function(dbRes) {
        if (dbRes[0] &&
          (input.username == dbRes[0].username &&
          input.passwordInputHash == dbRes[0].passwordHash)
        ) {
          req.session.userid = dbRes[0].userid;
          req.session.username = dbRes[0].username;
          req.session.fname = dbRes[0].fname;
          req.session.lname = dbRes[0].lname;
          req.session.phonenumber = dbRes[0].phonenumber;

          console.log(req.session);

          //INSERT SOCKET IO
          let io = req.app.get("io");
          io.on('connection', function(socket){

          	io.to(socket.id).emit("assigneduserID", {assigneduserID :req.session.userid});
           // console.log("Logged in with userID");

          });
          //INSERT SOCKET IO

          res.redirect("/travel");
        } else {
          req.session.login_error = "Invalid username or password!";
          res.redirect("/login");
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

  convertHash(input)
    .then(compare(input))
    .catch(function(err) {
      req.session.login_error = err;
      res.redirect("/login");
    });
});

router.get("/logout", function(req, res) {
  delete req.session.username;
  res.redirect("/home");
});

module.exports = router;
