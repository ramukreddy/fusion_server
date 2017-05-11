
var mysql = require('mysql');
var databaseconfig = require('./databaseconfig');

var connection = mysql.createPool({

  host: databaseconfig.host,
  user: databaseconfig.user,
  password: databaseconfig.password,
  database: databaseconfig.database

});
module.exports = connection;