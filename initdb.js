const sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("database.db");

db.serialize(function(){

  // Create an initial table of users
  db.run("DROP TABLE IF EXISTS Users");
  db.run("CREATE TABLE Users (username TEXT, password TEXT, level TEXT)");
  db.run("INSERT INTO Users VALUES (?,?,?)", ['mem1', 'mem1', 'member']);
  db.run("INSERT INTO Users VALUES (?,?,?)", ['mem2', 'mem2', 'member']);
  db.run("INSERT INTO Users VALUES (?,?,?)", ['edit1', 'edit1', 'editor']);
  db.run("INSERT INTO Users VALUES (?,?,?)", ['edit2', 'edit2', 'editor']);

  // create an initial table of articles
  db.run("DROP TABLE IF EXISTS Articles");
  db.run("CREATE TABLE Articles (ridetype TEXT, username TEXT, startinglocation TEXT, endlocation TEXT, status TEXT)");
  //db.run("INSERT INTO Articles VALUES (?,?,?,?,?)"[],
          

});
