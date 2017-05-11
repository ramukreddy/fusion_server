var db = require('../config/dbconnection'); //reference of dbconnection.js

var InstitutionModel = {

    findByInstitutionById: function (institutionId, callback) {

        var query = db.query("select UserId,ExternalId,UserName,password from Users where UserName = ?",
            [companyId], function (error, results, fields) {
                if (error) {
                    callback(error, null);

                } else {
                    console.log("results ", [results]);
                    callback(null, results);
                }


            });
    },

    addInstitution: function (institution, callback) {

        return db.query("insert into Institutions (InstitutionName,AddressId) values",
            [institution.name, institution.addressId], function (error, results, fields) {
            if (error) {
                callback(error, null);

            } else {
                console.log("results ", [results]);
                callback(null, results.insertId);
            }


        });
    },

    addCollege: function (college, callback) {

        return db.query("insert into College (CollegeName,InstitutionId,AddressId) values",
            [college.name, college.institutionId, company.addressId], function (error, results, fields) {
            if (error) {
                callback(error, null);

            } else {
                console.log("results ", [results]);
                callback(null, results.insertId);
            }


        });
    },
    addCollegeDepartment: function (collegeDepartment, callback) {
        var query= db.query("insert into CollegeDepartment (DepartmentName,CollegeId) values",
            [collegeDepartment.name, collegeDepartment.collegeId], function (error, results, fields) {
            if (error) {
                callback(error, null);

            } else {
                console.log("results ", [results]);
                callback(null, results.insertId);
            }
        });
    },

}
module.exports = InstitutionModel;