var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("database.db");

function addRoute(rideid, userid, ridetype, startloc, startlong, startlat, endloc, endlong, endlat, date ,time, triptime, callback){
//rideid TEXT, userid TEXT, ridetype TEXT, startlong TEXT, startlat TEXT, endlong TEXT, endlat TEXT, time , status TEXT
 
  
  // add the route with the ID
  db.run("INSERT INTO trips VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
  [rideid, userid, ridetype, startloc, startlong, startlat, endloc, endlong, endlat, date ,time, triptime, "active"],
  function(err){
    callback(); console.log("trips.addRoute Called!");
	console.log(rideid, userid, ridetype, startloc, startlong, startlat, endloc, endlong, endlat, date ,time, triptime, "active")
  });
}





//Use this to check if results > 0
function getRouteID(rideid,callback){
  db.all("SELECT * FROM trips WHERE rideid = ?", rideid,function(
    err,
    results
  ) {
    callback(results);
  });

}

//get route information from database
function getRouteByID(rideid,callback){
  db.all("SELECT * FROM trips WHERE rideid = ?", rideid,function(
    err,
    results
  ) {
    callback(results);
  });

}
// Return all of the articles

// Create a new article given a title, content and username


module.exports = {addRoute,getRouteID,getRouteByID};


   //db.run("CREATE TABLE Articles (ridetype TEXT, username TEXT, startinglocation TEXT, endlocation TEXT, status TEXT)");
