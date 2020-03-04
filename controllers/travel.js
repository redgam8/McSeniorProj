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
	
	
	function addroutetodatabase (){
		
		
		
		
	}
	
	
	
	
	console.log("outputting contents of the body request");
	console.log(req.body);
	
	console.log(req.session.userid,
					 req.body.ridetype, 
					 req.body.startingloc, 
					 req.body.startlong, 
					 req.body.startlat, 
					 req.body.startingloc, 
					 req.body.endlong, 
					 req.body.endlat, 
					 req.body.date,
					 req.body.time);
	
	//valueAsNumber
	
	
	
	
 /* 
	 travel.addRoute(req.session.userid,
					req.body.ridetype, 
					req.body.startlong, 
					req.body.startlat, 
					req.body.endlong, 
					req.body.endlat, 
					req.body.date,
					req.body.time,
					 test);
	
	
	 */
	
	 res.redirect("/");
	//userid	ridetype	startlong	startlat	endlong	endlat	status

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
