const express = require('express');
var router = express.Router();
var Request = require("request");
const travel = require('../models/travel.js');

// Display the members page
router.get("/", function(req, res)
{
  res.render("travel", req.TPL);
});

// Create an article if the form has been submitted
router.post("/submitroute", function(req, res)
{
	function getBingRoute(x1,y1,x2,y2){
		//build the route
		route1 = "http://dev.virtualearth.net/REST/v1/Routes?wayPoint.1=";
		//create logic to combine these two
		route11 = "43.7931192128773,-79.3164285297417";
		route2= "&Waypoint.2=";
		//create logic to combine these two
		route22="48.7931192128773,-79.3164285297417";
		route3= "&key=";
		route4="Aj2GRDYK72ehSn2kZNlHiGmrB2JSs504JcX0hAEBhCdDL1TOpAjouqPKwrgbsKK7&o=json";

		finalroute = route1+route11+route2+route22+route3+route4;

		Request.get(finalroute, (error, response, body) => {
		if(error) {
		return console.dir(error);
		}
		//console.log(JSON.parse(body));
		bingData = JSON.parse(body);
		console.log(bingData.resourceSets[0].resources[0].travelDurationTraffic);
		return bingData.resourceSets[0].resources[0].travelDurationTraffic;
	})
	}
  
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
	BingRouteTime = getBingRoute(req.body.startlong,req.body.startlat,req.body.endlong,req.body.endlat);
	
	
	
	travel.addRoute(rideidx,req.session.userid,
					 req.body.ridetype, 
					 req.body.startingloc, 
					 req.body.startlong, 
					 req.body.startlat, 
					 req.body.endloc, 
					 req.body.endlong, 
					 req.body.endlat, 
					 req.body.date,
					 //req.body.time, 
					 BingRouteTime, function(){
					 
					
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
