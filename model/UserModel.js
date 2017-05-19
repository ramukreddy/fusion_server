var db = require('../config/dbconnection'); //reference of dbconnection.js
var validator = require('validator');
var tokenGenerator = require('./TokenGenerator');


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

        var query = db.query("select UserId ,UserName,FirstName,LastName,InvitationStatus,UserStatus,LastLoginDate from User  where UserId=?",
            [UserId], function (error, results) {
                if (error) {
                    return callback(error, null);
                }
                callback(null, results);
            });
    },

    inviteUserByEmailId: function (firstName, lastName, email, callback) {

        if (validator.isEmail(email)) {

            var query = db.query("select UserName from User where UserName = ? ", [email], function (error, results, fields) {
                if (error) {
                    callback(error, null);
                }
                console.log(results);
                if (results && results.length > 0) {
                    callback("User already exist", null);
                } else {
                    var token = "";
                    tokenGenerator.createVerificationToken(function (cbtoken) {
                        token = cbtoken;
                    });
                    var record = { UserName: email, lastname: lastName, FirstName: firstName, VerificationToken: token, InvitationStatus: 'Invited', UserStatus: 'Active' };

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

    },

    saveUser: function (userObject, callback) {


        checkUserExist(userObject.email, function (errr, results) {

            if (!results) {
                var record = {
                    UserName: userObject.email, lastname: userObject.lastName, FirstName: userObject.firstName,
                    VerificationToken: token, InvitationStatus: 'Joined', UserStatus: 'Active'
                };

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
            } else {
                callback("Email alreayd registred with another account ", null);
            }
        });






    }


},

var checkUserExist = function (emailId, callback) {

    var query = db.query("select UserName from User where UserName = ? ", [email], function (error, results, fields) {
        if (error) {
            callback(error, null);
        }
        console.log(results);
        if (results && results.length > 0) {
            callback(null, results);
        }
    });


}
module.exports = UserModel;