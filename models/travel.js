var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("database.db");

function addRoute(rideid, userid, ridetype, startloc, startlong, startlat, endloc, endlong, endlat, date ,time, callback){
//rideid TEXT, userid TEXT, ridetype TEXT, startlong TEXT, startlat TEXT, endlong TEXT, endlat TEXT, time , status TEXT
  // add the route with the ID
  db.run("INSERT INTO trips VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
  [rideid, userid, ridetype, startloc, startlong, startlat, endloc, endlong, endlat, date ,time, "active"],
  function(err){
    callback();
  });
}






function getRouteID(rideid,callback){
  db.all("SELECT * FROM trips WHERE rideid = ?", rideid,function(
    err,
    results
  ) {
    callback(results);
  });

}

// Return all of the articles

// Create a new article given a title, content and username


module.exports = {addRoute,getRouteID};


   //db.run("CREATE TABLE Articles (ridetype TEXT, username TEXT, startinglocation TEXT, endlocation TEXT, status TEXT)");
