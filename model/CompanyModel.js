var db = require('../config/dbconnection'); //reference of dbconnection.js

var CompanyModel = {

    findByCompanyId: function (companyId, callback) {

        var query = db.query("select CompanyId,CompanyName,IndustryType.IndustryTypeName from Company,IndustryType "+
                            " where Company.CompanyID = ? and Company.IndustryTypeID = IndustryType.IndustryTypeId",
            [companyId], function (error, results, fields) {
                if (error) {
                    callback(error, null);

                } else {
                    console.log("results ", [results]);
                    callback(null, results);
                }


            });
    },

    addCompany: function (name,locationId,industryType, callback) {

        var record = { CompanyName: name, LocationId: locationId, IndustryTypeId: industryType};

        return db.query("insert into Company set ?",
            record, function (error, results, fields) {
            if (error) {
                callback(error, null);

            } else {
                console.log("results ", [results]);
                callback(null, results.insertId);
            }


        });
    },

    addDepartmentToCompany: function (name,companyId, callback) {

        return db.query("insert into Department (CompanyId,DepartmentName) values ?",
            [name, companyId], function (error, results) {
            if (error) {
                callback(error, null);

            } else {
                console.log("results ", [results]);
                callback(null, results.insertId);
            }


        });
    },

}
module.exports = CompanyModel;