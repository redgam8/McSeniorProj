const sqlite3 = require("sqlite3").verbose();
var userDb = new sqlite3.Database("users.db");

var password = "password";
passwordSha = require('crypto').createHash('sha256').update(password).digest("hex");
// Consider putting salt?

userDb.serialize(function(){

  // Create an initial table of users
  userDb.run("DROP TABLE IF EXISTS Users");
  userDb.run("CREATE TABLE Users (username TEXT, passwordHash CHAR(64))");
  userDb.run("INSERT INTO Users VALUES (?,?)", ['mem1', passwordSha]);
  userDb.run("INSERT INTO Users VALUES (?,?)", ['mem2', passwordSha]);
  userDb.run("INSERT INTO Users VALUES (?,?)", ['edit1', passwordSha]);
  userDb.run("INSERT INTO Users VALUES (?,?)", ['edit2', passwordSha]);

});
