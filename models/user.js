var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("database.db");

function getUsersWithUsername(username, callback) {
  db.all("SELECT * FROM Users WHERE username = ?", username, function(
    err,
    results
  ) {
    callback(results);
  });
}

function getidUserid(req, callback) {
  db.all("SELECT * FROM Users", function(
    err,
    results
  ) {
    callback(results);
  });
}

function createUser(
  userid,
  username,
  password,
  fname,
  lname,
  email,
  phonenumber
) {
  db.run(
    "INSERT INTO Users VALUES (?,?,?,?,?,?,?)",
    [userid, username, password, fname, lname, email, phonenumber],
    function(err) {
      // callback();
    }
  );
  console.log(
    "database input=",
    userid,
    username,
    password,
    fname,
    lname,
    email,
    phonenumber
  );
}

function getAllUsers(callback) {
  db.all("SELECT rowid,* FROM Users", function(err, results) {
    callback(results);
  });
}

function deleteContent(type, id, callback) {
  db.run("DELETE FROM " + type + " WHERE rowid=?", id, function(err) {
    callback();
  });
}
module.exports = {
  getUsersWithUsername,
  getidUserid,
  createUser,
  getAllUsers,
  deleteContent
};
