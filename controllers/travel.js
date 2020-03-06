const express = require('express');
var router = express.Router();
const travel = require('../models/travel.js');

// Display the members page
router.get("/", function(req, res)
{
  res.render("travel", req.TPL);
});

// Create an article if the form has been submitted
router.post("/submitroute", function(req, res)
{
  function randomString(length, chars) {
    var result = "";
    for (var i = length; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }
  
  function rideIdCheckLoop(dbResArr1) {
    if (dbResArr1.length > 0) {
      console.log("input ID: ", rideidx);
      console.log("return ID: ", dbResArr1[0].rideid);
      console.log("key duplicated");
      ride = randomString(8, "0123456789abcdefghijklmnopqrstuvwxyz");
      travel.getRouteID(rideidx, rideIdCheckLoop);
    } else { 
	
	console.log("outputting contents of the body request");
	console.log(req.body);
	travel.addRoute(rideidx,req.session.userid,
					 req.body.ridetype, 
					 req.body.startingloc, 
					 req.body.startlong, 
					 req.body.startlat, 
					 req.body.endloc, 
					 req.body.endlong, 
					 req.body.endlat, 
					 req.body.date,
					 req.body.time, function(){
					 
					
							 res.redirect("/"); 
        }
      );
    }
  }

  function rideIdCheck() {
    return new Promise(function(resolve, reject) {
      rideidx = randomString(8, "0123456789abcdefghijklmnopqrstuvwxyz");

      travel.getRouteID(rideidx, rideIdCheckLoop);
    });
  }
	
	rideIdCheck().catch(function(err) {
      req.session.signup_error = err;
      res.redirect("/signup");
    });
	
	
	
	
	
	
	

 });





function test(){
	//do something after
	console.log("routeadd successful");
}
router.get("/logout", function(req, res) {
  delete req.session.username;
  res.redirect("/");
});

module.exports = router;
