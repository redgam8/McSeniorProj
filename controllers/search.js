const express = require('express');
var router = express.Router();
var http = require('http').Server(express);
var Request = require("request");
const trip = require('../models/trip.js');
const travel = require('../models/travel.js');
var io = require('socket.io')(http);
// Display the members page
router.get("/", function (req, res)
{


	fastesttime = 0;
	//needs to pull data from the database
	var fastestid;
	var latDiff;
	var longDiff;
	var counter=0;
	//var testedid;
	//req.session.timelength = fastesttime;
	travel.getRouteByID(req.session.rideid, catoutRideid);
	//timelength="";
	var bingData;
	var bingData2;

	function catoutRideid(returnedResults)
	{

		//assign the returned values into session
		req.TPL.message="big booty";
		req.session.fastestid = "";
		req.session.bingData2 = "yte";
		req.session.testedid = "";
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
/* 		console.log("1trip results: " + req.session);
		console.log("1trip TPL results: " + JSON.stringify(req.TPL));
		console.log("trip results: " + req.session);
		console.log("trip TPL results: " + req.TPL.status); */

		//Display error if there is, then reset it.
		req.TPL.login_error = req.session.login_error;
		req.TPL.login_ready = req.session.login_ready;
		req.session.login_error = "";
		req.session.login_ready = "";

		//console.log("what is returned" + travel.getMatchingRoute(req.session.ridetype));


		travel.getMatchingRoute(req.session.ridetype, CheckMatches);

		//req.TPL.startloc = req.session.startloc;
		//res.render("trip", req.TPL)
	};

	async function CheckMatches(opposingtrip)
	{
		if (opposingtrip.length>0){
		for (i = 0; i < opposingtrip.length; i++)
		{
			req.session.testedid = opposingtrip[i].rideid;

			// Compare midpoints
			latDiff = (parseFloat(req.session.startlat) + parseFloat(req.session.endlat) - parseFloat(opposingtrip[i].startlat) - parseFloat(opposingtrip[i].endlat))/2
			longDiff = (parseFloat(req.session.startlong) + parseFloat(req.session.endlong) - parseFloat(opposingtrip[i].startlong) - parseFloat(opposingtrip[i].endlong))/2
			console.log("Midpoints difference: ", Math.abs(latDiff) + Math.abs(longDiff) );

			if ( Math.abs(latDiff) + Math.abs(longDiff) < 2 ) {
				counter = counter +1;

				if (req.session.ridetype == "offer")
				{
					point_a = req.session.startlat + "," + req.session.startlong;
					point_b = req.session.endlat + "," + req.session.endlong;
					point_c = opposingtrip[i].startlat + "," + opposingtrip[i].startlong;
					point_d = opposingtrip[i].endlat + "," + opposingtrip[i].endlong;
					route_a = point_a; //offer start
					route_b = point_b; //offer end
					route_c = point_c; //request start
					route_d = point_d; //request end

				}
				else if (req.session.ridetype == "request")
				{
					point_a = opposingtrip[i].startlat + "," + opposingtrip[i].startlong;
					point_c = req.session.startlat + "," + req.session.startlong;
					point_d = req.session.endlat + "," + req.session.endlong;
					point_b = opposingtrip[i].endlat + "," + opposingtrip[i].endlong;
					route_a = point_a; //offer start
					route_b = point_b; //offer end
					route_c = point_c; //request start
					route_d = point_d; //request end
				}

				/* 	await console.log("point_a = " + point_a);
				await console.log("point_b = " + point_b);
				await console.log("point_c = " + point_c);
				await console.log("point_d = " + point_d); */

				route_a = point_a; //offer start
				route_b = point_b; //offer end
				route_c = point_c; //request start
				route_d = point_d; //request end

				//create logic to combine these
				route1 = "http://dev.virtualearth.net/REST/v1/Routes?wayPoint.1=";
				route2 = "&Waypoint.2=";
				route3 = "&Waypoint.3=";
				route4 = "&Waypoint.4=";
				route5 = "&key=";
				route6 = "Aj2GRDYK72ehSn2kZNlHiGmrB2JSs504JcX0hAEBhCdDL1TOpAjouqPKwrgbsKK7&o=json";
				finalroute = route1 + route_a + route2 + route_c + route3 + route_d + route4 + route_b + route5 + route6;

				// await console.log(finalroute);
				req.session.bingData2 = await getroutebyApi(finalroute);
				//console.log("Time: "+ req.session.bingData2);
				console.log("The tested id is: " + opposingtrip[i].rideid + " with the time of: " + req.session.bingData2);
				checkfastest(req.session.bingData2, opposingtrip[i].rideid);
			}


		}

//		if counter == 0 {
//				console.log("No Trips found nearby lat/long");
//				res.redirect("trip");
//		}

		//console.log("bingdata2 = "+ req.session.bingData2);
		console.log("\n\n\n\n");

		console.log("Fastest trip id is: " + req.session.fastesttripid + " with the time of " + req.session.fastesttime);
		//establish/create a socket here
		let io = req.app.get("io");
		io.on('connection', function(socket){

			io.to(socket.id).emit("fastesttrip", {fastesttripid :req.session.fastesttripid});
		 console.log("fastesttrip sent to client");


		});

		if (req.session.fastesttime < req.TPL.triptime * 1.1 )
		{
			console.log("Current trip time is " +req.TPL.triptime + ". \n110% of this is " + req.TPL.triptime * 1.1 + ".\n" +req.session.fastesttime +" is within 110%");
			// this is where a match is found; regardless of who presses enter.
			//Enter the data into the database routes table.
			//Match is successful here.



		}
		else{

			console.log("Current trip time is " +req.TPL.triptime + ". \n 110% of this is " + req.TPL.triptime * 1.1 + ".\n" +req.session.fastesttime +" is NOT within 110%");
			console.log("Your ID: "+ req.session.rideid);
			console.log("Best Match ID: "+  req.session.fastesttripid );
			console.log("This just means that you suck and that the driver has exceeded 110% of his trip just to get you.");
		}

		res.redirect("/trip");

		}
		else{

			console.log("No Trips found");
			res.redirect("trip");
		}







	};

	function getroutebyApi(finalroute)
	{
		return new Promise(function (resolve, reject)
		{
			Request.get(finalroute, function (error, response, body)
			{
				if (error)
				{
					return console.dir(error);
				}
				//req.session.timelength=getBingRoute(a,b,c,d);
				//timelength=getBingRoute(a,b,c,d);
				bingData = JSON.parse(body);
				resolve(bingData.resourceSets[0].resources[0].travelDurationTraffic)
				// console.dir(bingData);

				//return(bingData3);
			}
			)

		}
		);

	}

	function checkfastest(x, y)
	{

		console.log("the full time to check is: " + x + " against TripID= " + y);
		//console.log("TripID= "+y);
		//console.log("req.session.fastesttime is set to: " + req.session.fastesttime);

		if (req.session.fastesttime != 0)
		{
			//something has been set
			if (x < req.session.fastesttime)
			{
				req.session.fastesttime = x;
				req.session.fastesttripid = y;

				console.log("Fastest trip id is: " + req.session.fastesttripid + " with the time of" + req.session.fastesttime);
				console.log("something is happening here");
			}

		}
		else
		{
			req.session.fastesttime = x;
			req.session.fastesttripid = y;
			console.log("something is happening here, no fastesttime set?");
			console.log("Fastest trip id is: " + req.session.fastesttripid + " with the time of" + req.session.fastesttime);
		}


	}

}
);

module.exports = router;
