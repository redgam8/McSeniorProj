var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("database.db");

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
