var db = require('../config/dbconnection'); //reference of dbconnection.js
var validator = require('validator');


var UserModel = {

    validateUsernamePassword: function (username, password, callback) {

        var query = db.query("select UserId ,UserName,FirstName,LastName,InvitationStatus,UserStatus,LastLoginDate from User where UserName = ? AND UserPassword = ?", [username, password], function (error, results, fields) {
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

        return db.query("select UserId ,UserName,FirstName,LastName,InvitationStatus,UserStatus,LastLoginDate from User  where UserName = ?", [UserName], callback);
    },

    findByUserId: function (externalId, callback) {

        return db.query("select UserId ,UserName,FirstName,LastName,InvitationStatus,UserStatus,LastLoginDate from User  where UserId=?", [UserId], callback);
    },

    inviteUserByEmailId: function (firstName, lastName, email, callback) {

        if (validator.isEmail(email)) {
            var query = db.query("select UserName from User where UserName = ? ",[email], function (error, results, fields) {
                if (error) {
                    callback(error, null);
                }
                console.log(results);
                if (results.length > 0) {
                    callback("User already exist", null);
                } else {

                    var record= { UserName: email, lastname: lastName, FirstName: firstName ,InvitationStatus:'Invited',UserStatus:'Active'};

                    var insertQuery = db.query("insert into User  set ? ",
                        record, function (error, results) {
                            console.log(insertQuery.sql);
                            if (error) {
                                console.log(error);
                                callback(error, null);

                            } else {
                                console.log("results ", [results]);
                                callback(null, results.insertId);
                            }


                        });
                }

            });

        } else {

            callback("invalid email id", null);

        }

    }

}
module.exports = UserModel;