const express = require('express');
const app = express();
const port = 3000;
const sqlite3 = require("sqlite3").verbose();
var userDb = new sqlite3.Database("users.db");
var routeDb = new sqlite3.Database("route.db");

app.use(express.static(__dirname));

// app.use("/travel-info", function(req,res,next) {
//   if (req.session.level == "user" || req.session.level == "editor") {
//     next();
//   }else{
//     res.redirect("/")
//   }
// });

app.get('/login', function(req, res) {

  var loginCheck = "Login Failed";

  userDb.all("SELECT * FROM Users WHERE username=?", req.query.username,
    function(err,result) {
      if(result==""){
        console.log("fail");
        res.send(loginCheck);
      }else{
        function compare(passwordDb, passwordInput){
          if (passwordInput == passwordDb) {
            loginCheck = "Login Success";
            // req.session.username=req.query.username;
          };
          res.send(loginCheck);
        };

        function hash(callback){
          var passwordDb = result[0].passwordHash;
          var passwordInput = require('crypto').createHash('sha256').update(req.query.password).digest("hex");
          callback(passwordDb, passwordInput);
        }

        hash(compare);
      };
    }
  );
});

app.get('/create', function(req, res) {

  var signupCheck = "Sign-up Failed";

  userDb.all("SELECT * FROM Users WHERE username=?", req.query.username,
    function(err,result) {
      if(result == ""){
        function addUser(passwordInput){
          userDb.run("INSERT INTO Users VALUES (?,?)",
            [req.query.username, passwordInput], function(err) {
            // Will put name and email
              signupCheck = "Success"
              res.send(signupCheck);
            }
          )
        };
        function hashSignup(callback){
          var passwordInput = require('crypto').createHash('sha256').update(req.query.password).digest("hex");
          callback(passwordInput);
        }
        hashSignup(addUser);

      }else{
        console.log("no error?");
        res.send(signupCheck);
      };
    }
  );
});

app.listen(port, () => console.log(`server listening on port ${port}!`));
