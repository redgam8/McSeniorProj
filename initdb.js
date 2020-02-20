const sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("database.db");

var password = "password";
passwordSha = require('crypto').createHash('sha256').update(password).digest("hex");

db.serialize(function(){

  // Create an initial table of users
  db.run("DROP TABLE IF EXISTS Users");
  db.run("CREATE TABLE Users (username TEXT, passwordHash TEXT, name TEXT, email TEXT, role TEXT)");
  db.run("INSERT INTO Users VALUES (?,?,?,?,?)", ['mem1', passwordSha, 'nameSample', 'emailSample', 'Driver']);
  db.run("INSERT INTO Users VALUES (?,?,?,?,?)", ['mem2', passwordSha, 'nameSample', 'emailSample', 'Rider']);
  db.run("INSERT INTO Users VALUES (?,?,?,?,?)", ['edit1', passwordSha, 'nameSample', 'emailSample', 'Driver']);
  db.run("INSERT INTO Users VALUES (?,?,?,?,?)", ['edit2', passwordSha, 'nameSample', 'emailSample', 'Rider']);

  // create an initial table of articles
  // db.run("DROP TABLE IF EXISTS Articles");
  // db.run("CREATE TABLE Articles (ridetype TEXT, username TEXT, startinglocation TEXT, endlocation TEXT, status TEXT)");
  //db.run("INSERT INTO Articles VALUES (?,?,?,?,?)"[],


});
