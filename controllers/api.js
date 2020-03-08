const express = require('express');
var router = express.Router();
const travel = require('../models/travel.js');

var Request = require("request");
//build the route
route1 = "http://dev.virtualearth.net/REST/v1/Routes?wayPoint.1="
//create logic to combine these two
route11 = "43.7931192128773,-79.3164285297417"
route2= "&Waypoint.2=";
//create logic to combine these two
route22="48.7931192128773,-79.3164285297417"
route3= "&key=";
route4="Aj2GRDYK72ehSn2kZNlHiGmrB2JSs504JcX0hAEBhCdDL1TOpAjouqPKwrgbsKK7&o=json"

finalroute = route1+route11+route2+route22+route3+route4

Request.get(finalroute, (error, response, body) => {
    if(error) {
        return console.dir(error);
    }
	console.log(JSON.parse(body));
	bingData = JSON.parse(body);
    console.log(bingData.resourceSets[0].resources[0].travelDurationTraffic);
});