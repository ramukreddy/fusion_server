var db = require('../config/dbconnection'); //reference of dbconnection.js

var UserModel = {

    validateUsernamePassword: function (username, password, callback) {

        var query = db.query("select ExternalId,UserName,FirstName,LastName,invitation_status,user_status from Users where UserName = ? AND password = ?", [username, password], function (error, results, fields) {
            if (error) {
                callback(error, null);

            } else {
                console.log("results ", [results]);
                callback(null, results);
            }


        });
        console.log(query.sql);
    },
    findByUsername: function (username, callback) {

        return db.query("select UserId,ExternalId,UserName,password from Users where UserName = ?", [UserName], callback);
    },

    findByExternalId: function (externalId, callback) {

        return db.query("select UserId,ExternalId,UserName from Users where ExternalId=?", [externalId], callback);
    }


}
module.exports = UserModel;