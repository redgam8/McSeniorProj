const sqlite3 = require("sqlite3").verbose();
var userDb = new sqlite3.Database("users.db");

String.prototype.hashCode = function() {
  var hash = 0, i, chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

var password = "password".hashcode();

db.serialize(function(){

  // Create an initial table of users
  db.run("DROP TABLE IF EXISTS Users");
  db.run("CREATE TABLE Users (username TEXT, passwordHash INT)");
  db.run("INSERT INTO Users VALUES (?,?,?)", ['mem1', password]);
  db.run("INSERT INTO Users VALUES (?,?,?)", ['mem2', password]);
  db.run("INSERT INTO Users VALUES (?,?,?)", ['edit1', password]);
  db.run("INSERT INTO Users VALUES (?,?,?)", ['edit2', password]);

  // create an initial table of articles
  db.run("DROP TABLE IF EXISTS Articles");
  db.run("CREATE TABLE Routes (originLong INT, originLat INT, destLong INT, destLat INT, username TEXT, content TEXT)");
  db.run("INSERT INTO Articles VALUES (?,?,?)",
          ["My favourite places to eat",
           "mem1",
            "<p>My favourite places to eat are The Keg, Boston Pizza and" +
            "   McDonalds</p><p>What are your favourite places to eat?</p>"]);
  db.run("INSERT INTO Articles VALUES (?,?,?)",
          ["Tips for NodeJS",
           "mem2",
            "<p>The trick to understanding NodeJS is figuring out how " +
            "async I/O works.</p> <p>Callback functions are also very " +
            "important!</p>"]);
  db.run("INSERT INTO Articles VALUES (?,?,?)",
          ["Ontario's top hotels",
           "edit1",
            "<p>The best hotel in Ontario is the Motel 8 on highway 234</p>" +
            "<p>The next best hotel is The Sheraton off main street.</p>"]);

});
