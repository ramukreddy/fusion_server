var db = require('../config/dbconnection'); //reference of dbconnection.js

var ProjectModel = {

    findByProjectId: function (projectId, callback) {

        var query = db.query("select ProjectId, ProjectName,ProjectDescription,RegisterToConceptId,ProjectFromDate,"+
                                            " ProjectToDate, ProjectStatus, ProjectURL "+
                            "from Project where ProjectId= ?",
            [projectId], function (error, results, fields) {
                if (error) {
                    callback(error, null);

                } else {
                    console.log("results ", [results]);
                    callback(null, results);
                }


            });
    },

    addProject: function (project,user,projectUrl,RegisterToConceptId,callback) {

        var query =  db.query("insert into Project (ProjectName,ProjectDescription,ProjectFromDate,ProjectToDate,"+
                                            " ProjectStatus, ProjectURL, RegisterToConceptId, CreatedBy)"+
                        "values",
                        [project.title, project.description,project.fromDate,project.toDate,project.status,
                        projectUrl,RegisterToConceptId,user.userId], 
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
module.exports = ProjectModel;