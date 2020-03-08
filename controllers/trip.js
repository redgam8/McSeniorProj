const express = require('express');
var router = express.Router();
var Request = require("request");
const trip = require('../models/trip.js');
const travel = require('../models/travel.js');

// Display the members page
router.get("/", function(req, res)
{
	//needs to pull data from the database

	travel.getRouteByID(req.session.rideid, catoutRideid);
	
	function catoutRideid(returnedResults){	
		//assign the returned values into session

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
		//req.TPL.startloc = req.session.startloc;	
		res.render("trip", req.TPL)
	};
  
});

// Create an article if the form has been submitted
router.post("/submitroute", function(req, res)
{
	
	
	
	
});
module.exports = router;
