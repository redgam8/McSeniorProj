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
		/* req.session.fastestid
		req.session.bingData2
		req.session.testedid 
		req.session.fastesttime */ 
		
		req.TPL.rideid = req.session.rideid
		req.TPL.userid = req.session.userid
		req.TPL.ridetype = req.session.ridetype
		req.TPL.startloc = req.session.startloc
		req.TPL.startlong = req.session.startlong
		req.TPL.startlat = req.session.startlat
		req.TPL.endloc = req.session.endloc
		req.TPL.endlong = req.session.endlong 
		req.TPL.endlat = req.session.endlat
		req.TPL.date = req.session.date 
		req.TPL.time = req.session.time 
		req.TPL.triptime = req.session.triptime
		req.TPL.status = req.session.status 


console.log(req.session.fastesttripid);


 res.render("search", req.TPL);

let io = req.app.get("io");
          io.on('connection', function(socket){

          	io.to(socket.id).emit("assigneduserID", {assigneduserID :req.session.userid});
            //console.log("Logged in with userID");
			
			 console.log("Question submitted: " + req.session.fastesttripid );
   
    
			io.to(socket.id).emit("deliverquestion", req.session.fastesttripid);
          });
/* io.on('connection', function(socket){
	 console.log("Question submitted: " + req.session.fastesttripid );
   
    // Broadcast the question to all the students
    socket.broadcast.emit("deliverquestion", req.session.fastesttripid);
 socket.on("submitquestion", function()
  {   

    // Make sure we've received the question OK
   

  }); */
  

  
  
  
});
module.exports = router;
