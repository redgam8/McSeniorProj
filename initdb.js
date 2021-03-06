const sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("database.db");

var password = "password";
passwordSha = require("crypto")
  .createHash("sha256")
  .update(password)
  .digest("hex");

db.serialize(function() {
  // Create an initial table of users
  db.run("DROP TABLE IF EXISTS Users");
  db.run("DROP TABLE IF EXISTS trips");
  db.run("DROP TABLE IF EXISTS routes");
  db.run(
    "CREATE TABLE Users (userid TEXT, username TEXT, passwordHash TEXT, fname TEXT, lname TEXT, email TEXT, phonenumber TEXT, latestid TEXT)"
  );
  db.run("INSERT INTO Users VALUES (?,?,?,?,?,?,?,?)", [
    "mem1",
    "mem1",
    passwordSha,
    "nameSample",
    "lastname26",
    "emailSample",
    "123456789",
	""
  ]);
  db.run("INSERT INTO Users VALUES (?,?,?,?,?,?,?,?)", [
    "mem2",
    "mem2",
    passwordSha,
    "nameSample",
    "lastname24",
    "emailSample",
    "123456789",
	""
  ]);
  db.run("INSERT INTO Users VALUES (?,?,?,?,?,?,?,?)", [
    "mem3",
    "edit1",
    passwordSha,
    "nameSample",
    "lastname23",
    "emailSample",
    "123456789",
	""
  ]);
  db.run("INSERT INTO Users VALUES (?,?,?,?,?,?,?,?)", [
    "mem4",
    "edit2",
    passwordSha,
    "nameSample",
    "lastname2",
    "emailSample",
    "123456789",
	""
  ]);

  //create a table for the routes
  //given userid	ridetype	startlong	startlat	endlong	endlat	status

  db.run(
    "CREATE TABLE trips (rideid TEXT, userid TEXT, ridetype TEXT, startloc TEXT,startlong TEXT, startlat TEXT, endloc TEXT, endlong TEXT, endlat TEXT, date TEXT,time TEXT, triptime TEXT,status TEXT)"
  );
  
   db.run("INSERT INTO trips VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[
  "dggdtodm", "mem1", "offer", "Aurora Ct, Toronto, Ontario, Canada", "-79.3164285297417", "43.7931192128773", "Vaughan Blvd, Vaughan, Ontario, Canada", "-79.4646749996484", "43.8093500000245", "2020-03-07", "14:22", "1193", "active"]);


	db.run(
		"CREATE TABLE routes (driverid TEXT, driverrideid TEXT, riderid TEXT, riderideid TEXT, status)"
	  );
	  
	  
  // create an initial table of articles
  // db.run("DROP TABLE IF EXISTS Articles");
  // db.run("CREATE TABLE Articles (ridetype TEXT, username TEXT, startinglocation TEXT, endlocation TEXT, status TEXT)");
  //db.run("INSERT INTO Articles VALUES (?,?,?,?,?)"[],
});
