const express = require('express');
var router = express.Router();
var Request = require("request");
const trip = require('../models/trip.js');
const travel = require('../models/travel.js');

// Display the members page
router.get("/", function(req, res)
{
	fastesttime=0;
	//needs to pull data from the database
	var fastestid;
	//var testedid;
	//req.session.timelength = fastesttime;
	travel.getRouteByID(req.session.rideid, catoutRideid);
	//timelength="";
	var bingData;
	var bingData2;
	
	function catoutRideid(returnedResults){	
	
		//assign the returned values into session
		
		req.session.fastestid="";
		req.session.bingData2 = "yte";
		req.session.testedid="";
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
	
	
		
		 travel.getMatchingRoute(req.session.ridetype, CheckMatches);
		
		//req.TPL.startloc = req.session.startloc;	
		//res.render("trip", req.TPL)
	};
	
	
	
	
	
	 function getroutebyApi(finalroute){
			console.log("API Called!");
			 
			Request.get(finalroute, (error, response, body)  =>  {
				if(error) {
					return console.dir(error);
				}
				
				bingData2 = JSON.parse(body);
				var asdf = JSON.parse(body);
				console.log("ASDF API Value returned is "+ asdf.resourceSets[0].resources[0].travelDurationTraffic);
				return(asdf);
				});
				console.log("Second level API Value returned is "+asdf.resourceSets[0].resources[0].travelDurationTraffic);
						//return(asdf);
			
			}
	
	 async function CheckMatches(opposingtrip){
	
		 
	 for (i=0;i<opposingtrip.length; i++)
	{
		//await console.log("await test = "+ opposingtrip[i].rideid);
		req.session.testedid = opposingtrip[i].rideid;
		await console.log("await tested id = "+ opposingtrip[i].rideid);
		if (req.session.ridetype == "offer")
		{
			point_a = req.session.startlat + "," + req.session.startlong;
			point_b = req.session.endlat + "," + req.session.endlong;
			point_c = opposingtrip[i].startlat  + "," +  opposingtrip[i].startlong;
			point_d = opposingtrip[i].endlat  + "," +  opposingtrip[i].endlong;
			route_a = point_a; //offer start
			route_b = point_b; //offer end
			route_c = point_c; //request start
			route_d = point_d; //request end

		}
		else if (req.session.ridetype == "request")
		{
			point_a = opposingtrip[i].startlat  + "," +  opposingtrip[i].startlong;
			point_c = req.session.startlat + "," + req.session.startlong;
			point_d = req.session.endlat + "," + req.session.endlong;
			point_b = opposingtrip[i].endlat  + "," +  opposingtrip[i].endlong;
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
			route2= "&Waypoint.2=";
			route3= "&Waypoint.3=";	
			route4= "&Waypoint.4=";
			route5= "&key=";
			route6="Aj2GRDYK72ehSn2kZNlHiGmrB2JSs504JcX0hAEBhCdDL1TOpAjouqPKwrgbsKK7&o=json";
			finalroute=route1 + route_a + route2 + route_c + route3 + route_d +route4 + route_b + route5 + route6;
			var bingDataTime;
			
		/* 	async function  getrouteapi(finalroutea){
				Request.get(finalroutea, (error, response, body) => {
				if(error) {
					return console.dir(error);
				}			
				console.log(JSON.parse(body).resourceSets[0].resources[0].travelDurationTraffic);
				return(JSON.parse(body).resourceSets[0].resources[0].travelDurationTraffic);
				});
				//bingDataTime = bingDataTime.resourceSets[0].resources[0].travelDurationTraffic;
				//await console.log(bingDataTime.resourceSets[0].resources[0]);
				
			}
				 */
			
			await Request.get(finalroute, async function (error, response, body)  {
				if(error) {
					return console.dir(error);
				}			
				
				bingDataTime=JSON.parse(body);
				console.log(bingDataTime.resourceSets[0].resources[0].travelDurationTraffic);
				//return (JSON.parse(response));
				//bingDataTime = bingDataTime.resourceSets[0].resources[0].travelDurationTraffic;
				//console.log(bingDataTime.resourceSets[0].resources[0].travelDurationTraffic);
				
			});
			
		
			
			
			//bingDataTime.then(value => {console.log("u w0t m8" + value)});
			//await console.log("The tested ID is:" + opposingtrip[i].rideid + " and "+ bingDataTime.resolve);
			
		}
			// console.log("bingdata2 = "+ req.session.bingData2);
			
			
		function checkfastest(tested, time){
			
			
		}	
			res.render("trip", req.TPL);
		};

		
});


module.exports = router;
