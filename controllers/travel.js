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
	
	
	
	
	console.log("outputting contents of the body request");
	console.log(req.body);
 
	 travel.addRoute(req.body.ridetype, 
					req.body.startlong, 
					req.body.startlat, 
					req.body.endlong, 
					req.body.endlat, test);
	
	
	
	
	
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
