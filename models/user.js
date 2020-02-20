var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("database.db");

// Return all of the articles
function getUsers(username, callback)
{
  db.all("SELECT * FROM Users WHERE username = ?",username,
  	     function(err,results) { callback(results); });
}

// Create a new article given a title, content and username
function createArticle(article,username,callback)
{
  db.run("INSERT INTO Articles VALUES (?,?,?)",
         [article.title, username, article.content],
         function(err)
         {
           callback();
         });
}

function createUser(username,password, name, email, role)
{
  db.run("INSERT INTO Users VALUES (?,?,?,?,?)",
         [username, password, name, email, role],
         function(err) {
           // callback();
         }
       );
}


function getAllUsers(callback)
{
  db.all("SELECT rowid,* FROM Users",
  	     function(err,results) { callback(results); });
}

function deleteContent(type,id,callback)
{
    db.run("DELETE FROM " + type + " WHERE rowid=?",id,
         function(err) { callback(); });
}
module.exports = {getUsers,createArticle,createUser,getAllUsers,deleteContent};
