var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("database.db");

function addRoute(rideid, userid, ridetype, startlong, startlat, endlong, endlat, time, status, callback){
//rideid TEXT, userid TEXT, ridetype TEXT, startlong TEXT, startlat TEXT, endlong TEXT, endlat TEXT, time , status TEXT
  // add the route with the ID
  db.run("INSERT INTO trips VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
  [rideid, userid, ridetype, startlong, startlat, endlong, endlat, time, status],
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

module.exports = {addRoute};


   //db.run("CREATE TABLE Articles (ridetype TEXT, username TEXT, startinglocation TEXT, endlocation TEXT, status TEXT)");
