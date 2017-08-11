var db = require('../config/dbconnection'); //reference of dbconnection.js
var validator = require('validator');
var tokenGenerator = require('./TokenGenerator');


var UserModel = {

    validateUsernamePassword: function (username, password, callback) {

        var query = db.query("select User.UserId ,UserName,Roles.RoleName,FirstName,LastName,InvitationStatus,UserStatus,LastLoginDate from User,UserRoles,Roles "+
        " where  Roles.RoleId = UserRoles.RoleId and User.UserId = UserRoles.UserId and UserName = ? AND UserPassword = ? ", 
        [username, password], function (error, results, fields) {
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

        return db.query("select User.UserId ,UserName, Roles.RoleName,LastName,InvitationStatus,UserStatus,LastLoginDate from User,UserRoles,Roles where UserName = ? " +
            " and Roles.RoleId = UserRoles.RoleId and User.UserId = UserRoles.UserId", [UserName], callback);
    },

    findByUserId: function (externalId, callback) {

        var query = db.query("select User.UserId ,UserName, Roles.RoleName,LastName,InvitationStatus,UserStatus,LastLoginDate from User,UserRoles,Roles where UserId = ? " +
            "and Roles.RoleId = UserRoles.RoleId and User.UserId = UserRoles.UserId ",
            [UserId], function (error, results) {
                if (error) {
                    return callback(error, null);
                }
                callback(null, results);
            });
    },

    findByInviteeToken: function (token, callback) {

        var query = db.query("select UserId ,UserName,FirstName,LastName,InvitationStatus,UserStatus,LastLoginDate from User  where VerificationToken=?",
            [token], function (error, results) {
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
                    var record = { UserName: email, LastName: lastName, FirstName: firstName, VerificationToken: token, InvitationStatus: 'Invited', UserStatus: 'Active' };

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

        checkUserExist(userObject.email, function (error, results) {

            if (!error && results.length <= 0) {
                var record = {
                    UserName: userObject.email,
                    UserPassword: userObject.password,
                    lastname: userObject.lastName,
                    FirstName: userObject.firstName,
                    VerificationToken: userObject.token,
                    InvitationStatus: 'Joined', UserStatus: 'Active'
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
                callback("Email already registred with another account ", null);
            }
        });
    },

    updateUser: function (userObject, callback) {
        var record = {

        };

        var insertQuery = db.query("UPDATE User  set ?  where UserId = ?",
            [
                {
                    UserPassword: userObject.password,
                    Lastname: userObject.lastName,
                    FirstName: userObject.firstName,
                    InvitationStatus: 'Joined', UserStatus: 'Active'
                },
                userObject.userId
            ], function (error, results) {
                console.log(insertQuery.sql);
                if (error) {
                    console.log(error);
                    callback(error, null);

                } else {
                    console.log("results ", [results]);
                    callback(null, results.insertId);
                }
            });

    },
}
checkUserExist = function (emailId, callback) {

    var query = db.query("select UserName from User where UserName = ? ", [emailId], function (error, results, fields) {
        if (error) {
            callback(error, null);
        } else {
            callback(null, results);

        }

    });


}
module.exports = UserModel;