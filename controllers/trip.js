const express = require('express');
var router = express.Router();
var http = require('http').Server(express);
var Request = require("request");
const trip = require('../models/trip.js');
const user = require('../models/user.js');
const travel = require('../models/travel.js');
var io = require('socket.io')(http);
const fs = require('fs');
// Display the members page
router.get("/", function (req, res)
{
	
		/* req.session.fastestid
		req.session.bingData2
		req.session.testedid 
		req.session.fastesttime */ 
		//req.TPL.message = "";
		req.TPL.rideid = req.session.rideid;
		req.TPL.userid = req.session.userid;
		req.TPL.ridetype = req.session.ridetype;
		req.TPL.startloc = req.session.startloc;
		req.TPL.startlong = req.session.startlong;
		req.TPL.startlat = req.session.startlat;
		req.TPL.endloc = req.session.endloc;
		req.TPL.endlong = req.session.endlong ;
		req.TPL.endlat = req.session.endlat;
		req.TPL.date = req.session.date ;
		req.TPL.time = req.session.time; 
		req.TPL.triptime = req.session.triptime;
		req.TPL.status = req.session.status ;
		console.log(req.session.matchFound);
		//req.TPL.message = req.session.message;
		
		if  (req.session.matchFound == true){
			travel.getRouteID(req.session.fastesttripid,getinfo);
			
		}
		
		else {
			
			req.TPL.message="No match found yet!";
			res.render("trip", req.TPL);
		}
		
		function getinfo(data){
			
			 user.getidUserid(data[0].userid,displayall);
			
			
			
		}

		function displayall(data){
			console.log(data[0]);
			console.log(data[0].rideid);
			console.log(data[0].fname);
			
			req.TPL.fastestname = data[0].fname + " " + data[0].lname;
			req.TPL.fastestphonenumber = data[0].phonenumber;
			req.TPL.message = "Your match has been found!\n";
			req.TPL.message2 = "Matched Name: " + req.TPL.fastestname;
			req.TPL.message3 = "Phone Number"+ req.TPL.fastestphonenumber;
			console.log("you got here");
			 res.render("trip", req.TPL);

		}

  
});
module.exports = router;
