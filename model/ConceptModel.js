var db = require('../config/dbconnection'); //reference of dbconnection.js

var ConceptModel = {

    findByConceptId: function (conceptId, callback) {

        var query = db.query("select ConceptTitle,ConceptDescription,ConceptType,ConceptFromDate,"+
                                            " ConceptToDate, ConceptOpenToInstitution, ConceptOpenToAnyLocation,"+
                                            "ConceptStatus,ConceptMaxParticipants, CompanyId,ConceptCreatedBy "+
                            "from Concept where ConceptId= ?",
            [conceptId], function (error, results, fields) {
                if (error) {
                    callback(error, null);

                } else {
                    console.log("results ", [results]);
                    callback(null, results);
                }


            });
    },

    addConcept: function (concept,user,companyId,callback) {

        var query =  db.query("insert into Concept (ConceptTitle,ConceptDescription,ConceptType,ConceptFromDate,"+
                                            " ConceptToDate, ConceptOpenToInstitution, ConceptOpenToAnyLocation,"+
                                            "ConceptStatus,ConceptMaxParticipants, CompanyId,ConceptCreatedBy)"+
                        "values",
                        [concept.title, concept.description,concept.fromDate,concept.toDate,concept.openToInstitution,
                        concept.openToAnylocation,concet.status,concept.particiapnts,companyId,user.userId], 
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

  
}
module.exports = ConceptModel;