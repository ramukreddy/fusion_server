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

        var record = { InstitutionName: institution.name, AddressId: institution.addressId };

        return db.query("insert into Institutions set ? ",
            record, function (error, results, fields) {
                if (error) {
                    callback(error, null);

                } else {
                    console.log("results ", [results]);
                    callback(null, results.insertId);
                }


            });
    },

    addCollege: function (college, addressId, callback) {
        var record = { CollegeName: college.name, InstitutionId: college.institutionId, AddressId: addressId };

        return db.query("insert into College  set ? ",
            record, function (error, results, fields) {
                if (error) {
                    callback(error, null);

                } else {
                    console.log("results ", [results]);
                    callback(null, results.insertId);
                }


            });
    },
    addCollegeDepartment: function (collegeDepartment, callback) {

        var record = { DepartmentName: collegeDepartment.name, CollegeId: collegeDepartment.collegeId };

        var query = db.query("insert into CollegeDepartment (DepartmentName,CollegeId) values",
            record, function (error, results, fields) {
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