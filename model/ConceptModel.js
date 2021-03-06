var db = require('../config/dbconnection'); //reference of dbconnection.js
var ConceptModelSQLConstants = require('./ConceptModelSQLConstants'); //reference of dbconnection.js

var ConceptModel = {

    findByConceptId: function (conceptId, callback) {

        var query = db.query(ConceptModelSQLConstants.findConceptByConceptId,
            [conceptId], function (error, results, fields) {
                if (error) {
                    callback(error, null);

                } else {
                    console.log("results ", [results]);
                    callback(null, results);
                }

            });
    },

    getRegisteredConcepts: function (userId, callback) {
        var query = db.query(ConceptModelSQLConstants.getRegisteredConcepts,
            [userId], function (error, results, fields) {
                if (error) {
                    callback(error, null);
                } else {
                    console.log("results ", [results]);
                    callback(null, results);
                }
            });
    },

    getAllConceptsForUser: function (userId, callback) {

        var query = db.query(ConceptModelSQLConstants.getAllConceptsForUserSQL, userId,
            function (error, results, fields) {
                if (error) {
                    console.log(error);
                    callback(error, null);
                } else {
                    console.log("results ", [results]);
                    callback(null, results);
                }
            });
    },

     getAllOpenConceptsForTeacher: function (teacherId, callback) {

        var query = db.query(ConceptModelSQLConstants.getAllOpenConceptsForTeacherSQL, teacherId,
            function (error, results, fields) {
                if (error) {
                    console.log(error);
                    callback(error, null);
                } else {
                    console.log("results ", [results]);
                    callback(null, results);
                }
            });
    },

    addConcept: function (concept, user, companyId, callback) {

        var record = {
            ConceptTitle: concept.conceptTitle, ConceptDescription: concept.conceptDescription, ConceptFromDate: concept.conceptStartDate,
            ConceptToDate: concept.conceptEndDate, ConceptOpenToInstitution: concept.conceptOpenToInstitution, ConceptOpenToAnyLocation: concept.openToAnylocation,
            ConceptStatus: "Active", ConceptMaxParticipants: concept.conceptMaxParticipants, CompanyId: companyId, ConceptCreatedBy: user.UserId
        };

        // var query = db.query("insert into Concept (ConceptTitle,ConceptDescription,ConceptType,ConceptFromDate," +
        //     " ConceptToDate, ConceptOpenToInstitution, ConceptOpenToAnyLocation," +
        //     "ConceptStatus,ConceptMaxParticipants, CompanyId,ConceptCreatedBy)" +
        //     "values",
        //     [concept.title, concept.description, concept.fromDate, concept.toDate, concept.openToInstitution,
        //     concept.openToAnylocation, concet.status, concept.particiapnts, companyId, user.userId],
        var query = db.query("insert into Concept set ? ", record,
            function (error, results, fields) {
                if (error) {
                    console.log(query.sql)
                    callback(error, null);

                } else {
                    console.log("results ", [results]);
                    callback(null, results.insertId);
                }


            });
    },

    registerToConcept: function (conceptId, userId, callback) {
        var record = {
            ConceptId: conceptId, TeacherId: userId
        };

        var query = db.query("insert into RegisterToConcept set ? ", record, function (error, results, fields) {
            if (error) {
                console.log(query.sql)
                callback(error, null);

            } else {
                console.log("results ", [results]);
                callback(null, results.insertId);
            }

        });

    },

    getUniversitiesForRegisteredConcept: function (conceptId, callback) {
        var options = {sql:ConceptModelSQLConstants.getUniversitiesForRegisteredConceptSQL, nestTables: true};

        var query = db.query(options,
            [conceptId], function (error, results, fields) {
                if (error) {
                    console.log(query);
                    console.log(error);
                    callback(error, null);
                } else {
                    console.log("results ", [results]);
                    callback(null, results);
                }
            });
    },

    getProjectsForConceptAndCollege: function (conceptId, collegeId, callback) {
        var options = {sql:ConceptModelSQLConstants.getProjectsForConceptAndCollege, nestTables: true};

        var query = db.query(options,
            [conceptId], [collegeId],function (error, results, fields) {
                if (error) {
                    console.log(query);
                    console.log(error);
                    callback(error, null);
                } else {
                    console.log("results ", [results]);
                    callback(null, results);
                }
            });
    }

}
module.exports = ConceptModel;