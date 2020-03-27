const express = require('express');
var router = express.Router();
var Request = require("request");
const trip = require('../models/trip.js');
const travel = require('../models/travel.js');

// Display the members page
router.get("/", function(req, res)
{
	//needs to pull data from the database
	var fastestid;
	var testedid;
	//req.session.timelength = fastesttime;
	travel.getRouteByID(req.session.rideid, catoutRideid);
	//timelength="";
	
	
	function catoutRideid(returnedResults){	
		//assign the returned values into session
		req.session.testedid;
		req.session.fastesttime = 0;
		req.session.rideid = returnedResults[0].rideid;
		req.session.userid = returnedResults[0].userid;
		req.session.ridetype = returnedResults[0].ridetype;
		req.session.startloc = returnedResults[0].startloc;
		req.session.startlong = returnedResults[0].startlong;
		req.session.startlat = returnedResults[0].startlat;
		req.session.endloc = returnedResults[0].endloc;
		req.session.endlong = returnedResults[0].endlong;
		req.session.endlat = returnedResults[0].endlat;
		req.session.date = returnedResults[0].date;
		req.session.time = returnedResults[0].time;
		req.session.triptime = returnedResults[0].triptime;
		req.session.status = returnedResults[0].status;
		req.TPL.rideid = returnedResults[0].rideid;
		req.TPL.userid = returnedResults[0].userid;
		req.TPL.ridetype = returnedResults[0].ridetype;
		req.TPL.startloc = returnedResults[0].startloc;
		req.TPL.startlong = returnedResults[0].startlong;
		req.TPL.startlat = returnedResults[0].startlat;
		req.TPL.endloc = returnedResults[0].endloc;
		req.TPL.endlong = returnedResults[0].endlong;
		req.TPL.endlat = returnedResults[0].endlat;
		req.TPL.date = returnedResults[0].date;
		req.TPL.time = returnedResults[0].time;
		req.TPL.triptime = returnedResults[0].triptime;
		req.TPL.status = returnedResults[0].status;
		console.log("1trip results: "+req.session);
		console.log("1trip TPL results: "+JSON.stringify(req.TPL));
		console.log("trip results: "+req.session);
		console.log("trip TPL results: "+req.TPL.status);
		
		  //Display error if there is, then reset it.
		req.TPL.login_error = req.session.login_error;
		req.TPL.login_ready = req.session.login_ready;
		req.session.login_error = "";
		req.session.login_ready = "";
		
		//console.log("what is returned" + travel.getMatchingRoute(req.session.ridetype));
	
	
		
		travel.getMatchingRoute(req.session.ridetype,CheckMatches);
		
		//req.TPL.startloc = req.session.startloc;	
		//res.render("trip", req.TPL)
	};
	
	 	 function CheckMatches(opposingtrip){
	
		console.log(req.session.ridetype);
		//console.log("opposing trip = " + opposingtrip[2].rideid);
		var fastesttripid;
			
		if (req.session.ridetype == "offer"){

	
			for (i = 0; i < opposingtrip.length;  i++) {
				testedid = opposingtrip[i].rideid;
				console.log("Queried testrideid = " + testedid);
				point_a = req.session.startlat + "," + req.session.startlong;
				
				
				point_b = req.session.endlat + "," + req.session.endlong;
				point_c = opposingtrip[i].startlat  + "," +  opposingtrip[i].startlong;
				point_d = opposingtrip[i].endlat  + "," +  opposingtrip[i].endlong;
				
				
				route_a = point_a; //offer start
				//console.log("point_a = " + point_a);
				route_b = point_b; //offer end
				//console.log("point_b = " + point_b);
				route_c = point_c; //request start
				//console.log("point_c = " + point_c);
				route_d = point_d; //request end
				
				route1 = "http://dev.virtualearth.net/REST/v1/Routes?wayPoint.1=";
				//create logic to combine these two
				
				route2= "&Waypoint.2=";
				route3= "&Waypoint.3=";
				
				
				route4= "&Waypoint.4=";
				//create logic to combine these two
				route5= "&key=";
				route6="Aj2GRDYK72ehSn2kZNlHiGmrB2JSs504JcX0hAEBhCdDL1TOpAjouqPKwrgbsKK7&o=json";
				bingData = "";
				
				finalroute=route1 + route_a + route2 + route_c + route3 + route_d +route4 + route_b + route5 + route6;
				//console.log(finalroute);
				Request.get(finalroute, (error, response, body) => {
				if(error) {
					return console.dir(error);
				}
				//req.session.timelength=getBingRoute(a,b,c,d);
				//timelength=getBingRoute(a,b,c,d);
				bingData = JSON.parse(body);
				console.log("Function call:" + bingData.resourceSets[0].resources[0].travelDurationTraffic);
				fulltime = bingData.resourceSets[0].resources[0].travelDurationTraffic;
				//console.log("Ride time is: " + req.session.timelength);
			 // console.log("Starting location: " + opposingtrip[i].startloc + " Ending location:" + opposingtrip[i].endloc)
				
				
				console.log("Queried testrideid = " + testedid);
				console.log("the full time to check is: " + fulltime + " against TripID= " + testedid);
				
				
			
				
				//x = testedrideid;
				checkfastest(fulltime,req.session.testedid);
				});
			
			}
		
		}
		else if (req.session.ridetype == "request")
		{
			for (i = 0; i < opposingtrip.length; i++) {
				req.session.testedid = opposingtrip[i].rideid;
				console.log("Queried testrideid = " + req.session.testedid);
				
				point_a = opposingtrip[i].startlat  + "," +  opposingtrip[i].startlong;
				point_c = req.session.startlat + "," + req.session.startlong;
				point_d = req.session.endlat + "," + req.session.endlong;
				point_b = opposingtrip[i].endlat  + "," +  opposingtrip[i].endlong;
				route_a = point_a; //offer start
				route_b = point_b; //offer end
				route_c = point_c; //request start
				route_d = point_d; //request end
				
				
				route1 = "http://dev.virtualearth.net/REST/v1/Routes?wayPoint.1=";
				//create logic to combine these two
				
				route2= "&Waypoint.2=";
				
				route3= "&Waypoint.3=";
				
				route4= "&Waypoint.4=";
				//create logic to combine these two
				route5= "&key=";
				route6="Aj2GRDYK72ehSn2kZNlHiGmrB2JSs504JcX0hAEBhCdDL1TOpAjouqPKwrgbsKK7&o=json";
				bingData = "";
				
				finalroute=route1 + route_a + route2 + route_c + route3 + route_d +route4 + route_b + route5 + route6;
				console.log(finalroute);
				Request.get(finalroute, (error, response, body) => {
				if(error) {
					return console.dir(error);
				}			
				//console.log(JSON.parse(body));
				bingData = JSON.parse(body);
				console.log("Function call:" + bingData.resourceSets[0].resources[0].travelDurationTraffic);
				fulltime = bingData.resourceSets[0].resources[0].travelDurationTraffic;
				//console.log("Ride time is: " + req.session.timelength);
			 // console.log("Starting location: " + opposingtrip[i].startloc + " Ending location:" + opposingtrip[i].endloc)
				
				
				req.session.testedid = opposingtrip[i].rideid;
				
				//checkfastest(fulltime,req.session.testedid);
				});
			
			}
			
			
		}
		
		
		function checkfastest(x,y){
			//y = parseInt(x);
			console.log("the full time to check is: " + x + " against TripID= " + y);
			//console.log("TripID= "+y);
			//console.log("req.session.fastesttime is set to: " + req.session.fastesttime);
		 	
			if (req.session.fastesttime != 0)
			{
				//something has been set
				if (x < req.session.fastesttime){
				req.session.fastesttime = x;
				req.session.fastesttripid = y;
				
				console.log("Fastest trip id is: " + req.session.fastesttripid + " with the time of" + req.session.fastesttime);
				console.log("something is happening here");
				}
				else{
					console.log("Check completed");
					
				}
			}
			else{
				req.session.fastesttime = x;
				req.session.fastesttripid = y;
				console.log("something is happening here, no fastesttime set?");
				console.log("Fastest trip id is: " + req.session.fastesttripid + " with the time of" + req.session.fastesttime);
			} 

			
		}
		//	console.log("test for session setting = " + fastesttime);
			res.render("trip", req.TPL)
	
	};
	 
		
		
	
  
});

// Create an article if the form has been submitted
router.post("/submitroute", function(req, res)
{
	
	
	
	
});
module.exports = router;
