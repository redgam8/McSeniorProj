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
    } 
	else { 
	
	console.log("outputting contents of the body request");
	console.log(req.body);
	//BingRouteTime = getBingRoute(req.body.startlong,req.body.startlat,req.body.endlong,req.body.endlat);
	
	route1 = "http://dev.virtualearth.net/REST/v1/Routes?wayPoint.1=";
	//create logic to combine these two
	
	
	route11 =  req.body.startlat.toString() + "," + req.body.startlong.toString();
	console.log("route11 =" + route11);
	route2= "&Waypoint.2=";
	//create logic to combine these two
	route22= req.body.endlat.toString() + "," + req.body.endlong.toString();
		console.log("route22 =" + route22);
	route3= "&key=";
	route4="Aj2GRDYK72ehSn2kZNlHiGmrB2JSs504JcX0hAEBhCdDL1TOpAjouqPKwrgbsKK7&o=json";
	bingData = "";
	finalroute = route1+route11+route2+route22+route3+route4;
	console.log("REST API CALL = "+finalroute);
	Request.get(finalroute, (error, response, body) => {
	if(error) {
		return console.dir(error);
	}
	//console.log(body);
	bingData = JSON.parse(body);
	console.log("Function call:" + bingData.resourceSets[0].resources[0].travelDurationTraffic);
	BingRouteTime = bingData.resourceSets[0].resources[0].travelDurationTraffic;
	console.log("post return result: "+BingRouteTime);
	
/* 	console.log("parsed content = " + rideidx,
					req.session.userid,
					req.body.ridetype, 
					req.body.startingloc, 
					req.body.startlong, 
					req.body.startlat, 
					req.body.endingloc, 
					req.body.endlong, 
					req.body.endlat, 
					req.body.date,
					req.body.time, 
					BingRouteTime); */
					
		travel.addRoute(rideidx,
					req.session.userid,
					req.body.ridetype, 
					req.body.startingloc, 
					req.body.startlong, 
					req.body.startlat, 
					req.body.endingloc, 
					req.body.endlong, 
					req.body.endlat, 
					req.body.date,
					req.body.time, 
					BingRouteTime, function(){
							req.session.rideid = rideidx;
							//console.log("Session set trip id = " + req.session.rideid);
							console.log("Session variables= " + JSON.stringify(req.session));
							//console.log("Session variables= " + JSON.stringify(req.session.startingloc));
					
							 res.redirect("/search"); 
        } 
      );
	
	
	});
	
	
	//BingRouteTime = bingData.toString();
	
	
	
	/* 
*/
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

-
function test(){
	//do something after
	console.log("routeadd successful");
}
router.get("/logout", function(req, res) {
  delete req.session.username;
  res.redirect("/");
});

module.exports = router;
