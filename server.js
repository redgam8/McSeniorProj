const express = require('express');
const app = express();
const session = require('express-session');
const port = 3000;
const sqlite3 = require("sqlite3").verbose();
var userDb = new sqlite3.Database("users.db");
var routeDb = new sqlite3.Database("route.db");

// app.use(express.static(__dirname));

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

app.get("/home", function(req,res) {
console.log("session Log: "+req.session.login)
  if(req.session.login){
    res.redirect("/travel-info");
  }else{
    res.sendFile(__dirname + "/index.html")
  }
});

app.get("/travel-info", function(req,res) {
  if(!req.session.login){
    res.redirect("/home");
  };
  res.sendFile(__dirname + "/travel-info.html")
});


app.post('/login', function(req, res) {

  req.session.login = false;

  userDb.all("SELECT * FROM Users WHERE username=?", req.body.username,
    function(err,result) {
      if(result==""){
        req.session.errMsg = "User not found";
        res.send(req.session.errMsg);
      }else{
        function compare(passwordDb, passwordInput){
          if (passwordInput == passwordDb) {
            req.session.errMsg = "Login Success";
            req.session.login = true;
            res.send(req.session.errMsg);
          }else{
            req.session.errMsg = "Password not match";
            res.send(req.session.errMsg);
          };
        };
        function hash(callback){
          var passwordDb = result[0].passwordHash;
          var passwordInput = require('crypto').createHash('sha256').update(req.body.password).digest("hex");
          callback(passwordDb, passwordInput);
        }
        hash(compare);

      };
      console.log(req.session.errMsg);
    }
  );
});

app.post('/create', function(req, res) {
  var usernameInput = req.body.username;
  var passwordInput = req.body.password;
  var passwordConfirmInput = req.body.passwordConfirm;
  var name = req.body.name;
  var emailAddress = req.body.email;

  req.session.errMsg = "";

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
        req.session.errMsg = "Existed Account";
        console.log("Error: "+req.session.errMsg);
        req.session.signupSuccess = false;
      };
  });

  res.redirect("/");
});

app.get("/", function(req, res) {
  res.redirect("/home");
});

app.post("/", function(req, res) {
  res.redirect("/home");
});

app.use(express.static(__dirname));

app.listen(port, () => console.log(`server listening on port ${port}!`));
