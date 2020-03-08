const express = require('express');
const app = express();
const session = require('express-session');
const port = 3000;
const mustacheExpress = require('mustache-express');
const fs = require('fs');

// Include the mustache engine to help us render our pages
app.engine("mustache", mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

// We use the .urlencoded middleware to process form data in the request body,
// which is something that occurs when we have a POST request.
app.use(express.urlencoded({extended: false}));

// Use the session middleware
app.use(session({secret: 'keyboard cat'
                ,resave: false
                ,saveUninitialized:false}))

// Create a middleware to populate an initial template array
app.use(function(req,res,next) {

  // reset the template object to a blank object on each request
  req.TPL = {};

  // decide whether to display the login or log out button in the navbar
  //req.TPL.displaylogin = !req.session.username;
  req.TPL.displaylogout = req.session.username;

  next();
});

// Create middlewares for setting up navigational highlighting
// - we could condense this significantly, for example by having one middleware
// that looks at the URL and decides based on a configuration array... but it
// would come at the cost of readability (which matters more right now since
// we are learning middlewares for the first time).
function timeLogger(req, res, next)
{
	datatoappend =  Date() + ',' + req.path + ',' + req.ip  + ', query:' + JSON.stringify(req.query)  + ', body:' + JSON.stringify(req.body) + "\n" ;
	// fs.appendFile("log.txt", datatoappend, (err) => { if (err) throw err;});
	next();
}
app.use(timeLogger);

// app.use("/home",
//         function(req,res,next) { req.TPL.homenav = true; next(); });
// app.use("/articles",
//         function(req,res,next) { req.TPL.articlesnav = true; next(); });
// app.use("/members",
//         function(req,res,next) { req.TPL.membersnav = true; next(); });
// app.use("/editors",
//         function(req,res,next) { req.TPL.editorsnav = true; next(); });
// app.use("/login",
//         function(req,res,next) { req.TPL.loginnav = true; next(); });
// app.use("/signup",
//         function(req,res,next) { req.TPL.loginnav = true; next(); });

// protect access to the members page, re-direct user to home page if nobody
// is logged in


//protects access to travel page - must be logged in
app.use("/travel", function(req,res,next) {

  if (req.session.username) next();
  else res.redirect("/login");

});

app.use("/login", function(req,res,next) {

  if (req.session.username) res.redirect("/travel");
  else next();

});
//protects access to the signup page. Already logged in
app.use("/signup", function(req,res,next) {

  if (req.session.username) res.redirect("/travel");
  else next();

});

//
// app.use("/home", require("./controllers/home"));
app.use("/travel", require("./controllers/travel"));
app.use("/trip", require("./controllers/trip"));
app.use("/login", require("./controllers/login"));
app.use("/signup", require("./controllers/signup"));


// - We route / to redirect to /home by default
app.get("/", function(req, res) {
	  if (req.session.username) res.redirect("/travel");
  else res.redirect("/login");

});


// Catch-all router case
app.get(/^(.+)$/, function(req,res) {
  res.sendFile(__dirname + req.params[0]);

});

// Start the server
var server = app.listen(port, function() {console.log("Server listening...");})

let io = require('socket.io')(server);
app.set("io", io);
