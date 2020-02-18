const express = require('express');
const app = express();
const session = require('express-session');
const port = 3000;
const sqlite3 = require("sqlite3").verbose();
var userDb = new sqlite3.Database("users.db");
var routeDb = new sqlite3.Database("route.db");

app.use(express.static(__dirname));

app.use(express.urlencoded({extended: false}));
app.use(session({secret: 'keyboard cat'
                ,resave: false
                ,saveUninitialized:false}))

var log = function(req,res,next) {
  console.log(new Date(), req.path, JSON.stringify(req.query), JSON.stringify(req.body));
  // fs.appendFile('log.txt', new Date() + ", " + req.path + ", " + req.ip + ", " + JSON.stringify(req.query) + ", " +  JSON.stringify(req.body) + "\n", function(err, result) {
  //   if(err) console.log("err",err);
  // });

  next();
};

app.use(log);

app.use("/", function(req,res,next) {
  if (req.session.login) res.redirect("/travel-info");
  else next();
});


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

app.post('/create', function(req, res) {
  var usernameInput = req.body.username;
  var passwordInput = req.body.password;
  var passwordConfirmInput = req.body.passwordConfirm;
  var name = req.body.name;
  var email = req.body.email;

  req.session.errMsg = "";

  var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
  var emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  // Form input verification here
  if(usernameInput == "" || !usernameInput.match(/^[a-zA-z\d]+$/)) {
    req.session.usernameErr = true;
    errMsg += "● Username error: Only characters and numbers are allowed<br />";
  }else{
    req.session.usernameErr = false;
  }

  if(passwordInput == "" || !strongRegex.test(passwordInput)) {
    req.session.passwordErr = true;
    errMsg += "● Password error: Minimum 8 characters long. At least 1 uppercase, 1 lowercase, 1 number, and 1 special character (!, @, #, $, %, ^, &, *)<br />";
  }else{
    req.session.passwordErr = false;
  }

  if(passwordConfirmInput == "" || passwordInput != passwordConfirmInput) {
    req.session.passwordConfirmErr = true;
    errMsg += "● Password not match. <br />";
  }else{
    req.session.passwordConfirmErr = false;
  }

  if(name == "" || !name.match(/^[a-zA-z ]+$/)) {
    req.session.nameErr = true;
    errMsg += "● Name error: Only characters and spaces are allowed<br />";
  }else{
    req.session.nameErr = false;
  }

  if(emailAddress == "" || !emailRegex.test(emailAddress)) {
    req.session.emailErr = true;
    errMsg += "● Email Address error<br />";
  }else{
    req.session.emailErr = false;
  }

  if (errMsg == "") {
    console.log("Input verficiation passed.");

    userDb.all("SELECT * FROM Users WHERE username=?", usernameInput,
      function(err,result) {
        if(result == ""){
          function addUser(passwordInput){
            userDb.run("INSERT INTO Users VALUES (?,?)",
              [usernameInput, passwordInputHash], function(err) {
              // Will put name and email
                req.session.signupSuccess = true;
              }
            )
          };
          function hashSignup(callback){
            passwordInputHash = require('crypto').createHash('sha256').update(req.body.password).digest("hex");
            callback(passwordInputHash);
          }
          hashSignup(addUser);

        }else{
          req.session.signupErrMsg = "Existed Account";
          console.log("Error: "+req.session.signupErrMsg);
          req.session.signupSuccess = false;
        };
    });
  }else{
    console.log("Input verficiation failed.");
  };

  res.redirect("/");
});

app.listen(port, () => console.log(`server listening on port ${port}!`));
