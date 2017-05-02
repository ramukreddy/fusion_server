var configValues = require('./database_config');
//var mysql = require('mysql');


module.exports = {
    getConnectionString : function () {

      console.log(configValues['host'])  
    }
   
}