var db = require('../config/dbconnection'); //reference of dbconnection.js

var CompanyModel = {

    findByCompanyId: function (companyId, callback) {

        var query = db.query("select CompanyID,CompanyName,IndustryType.IndustryTypeName from Companies,IndustryType "+
                            " where Companies.CompanyID = ? and Companies.IndustryTypeID = IndustryType.IndustryTypeId",
            [companyId], function (error, results, fields) {
                if (error) {
                    callback(error, null);

                } else {
                    console.log("results ", [results]);
                    callback(null, results);
                }


            });
    },

    addCompany: function (company, callback) {

        return db.query("insert into Companies (Name,LocationId,IndustryTypeId) values ?",
            [company.name, company.locationId, company.industryType], function (error, results, fields) {
            if (error) {
                callback(error, null);

            } else {
                console.log("results ", [results]);
                callback(null, results.insertId);
            }


        });
    },

    addDepartmentToCompany: function (department, callback) {

        return db.query("insert into Department (CompanyID,DepartmentName) values ?",
            [department.name, department.companyId], function (error, results) {
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