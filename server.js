const express = require('express');
const app = express();
const port = 3000;
const sqlite3 = require("sqlite3").verbose();
var userDb = new sqlite3.Database("users.db");
var routeDb = new sqlite3.Database("route.db");

app.use(express.static(__dirname))

// const session = require('express-session');
// const mustacheExpress = require('mustache-express');
// const fs = require('fs');
//
// app.engine("mustache", mustacheExpress());
// app.set('view engine', 'mustache');
// app.set('views', __dirname + '/views');
//
// app.use(express.urlencoded({extended: false}));
//
// app.use(session({secret: 'keyboard cat'
//                 , resave: false
//                 , saveUninitialized: false}));
//
// // app.use(express.static(__dirname));
//
// app.use("/home", require("./controllers/home"));
// app.use("/travel-info", require("./controllers/travel-info"));
// app.use("/matching", require("./controllers/matching"));
//
// app.get("/", function(req, res) {
//   res.redirect("/home");
// });
//
// app.get('/', function(req,res) {
//   res.sendFile(__dirname);
// });

app.listen(port, () => console.log(`server listening on port ${port}!`));
