var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("database.db");

function addRoute(route, username, role, time, callback){
  // count existing records to calculate next ID
  db.all("SELECT * from Route WHERE role= (?)", role,
  function(err,results){
    callback(results.length);
  });

  var ID = role + (results.length + 1);

  // add the route with the ID
  db.run("INSERT INTO Route VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
  [routeID, route.depLat, route.depLong, route.destLat, route.destLong, route.midpoint, username, time],
  function(err){
    callback();
  });
}





function getRoute(route, username, time, callback){
  var shortestPathID = ""
}

function match(driverID, riderID, driverPathID, riderPathID){

}

// Return all of the articles
function getAllArticles(callback)
{
  db.all("SELECT rowid,* FROM Articles",
  	     function(err,results) { callback(results); });
}

// Create a new article given a title, content and username
function createArticle(article,username,callback)
{
  db.run("INSERT INTO Articles VALUES (?,?,?,?,?)",
         [article.ridetype, username, article.startingloc, article.endloc,'open'],
         function(err)
         {
           callback();
         });
}

module.exports = {getAllArticles
                 ,createArticle};


   //db.run("CREATE TABLE Articles (ridetype TEXT, username TEXT, startinglocation TEXT, endlocation TEXT, status TEXT)");
