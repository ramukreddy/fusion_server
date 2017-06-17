var db = require('../config/dbconnection'); //reference of dbconnection.js
var ProjectModelSQLConstants = require('./ProjectModelSQLConstants'); //reference of dbconnection.js

var ProjectModel = {

    findByProjectId: function (projectId, callback) {

        var query = db.query(ProjectModelSQLConstants.findByProjectIdSQL,
            [projectId], function (error, results, fields) {
                if (error) {
                    callback(error, null);

                } else {
                    console.log("results ", [results]);
                    callback(null, results);
                }


            });
    },

    findByProjectsByUserId: function (userId, callback) {

        var query = db.query(ProjectModelSQLConstants.findByProjectsByUserIdSQL,
            [userId], function (error, results, fields) {
                if (error) {
                    console.log(error);
                    callback(error, null);

                } else {
                    console.log("results ", [results]);
                    callback(null, results);
                }


            });
    },

    addProject: function (project, user, projectUrl, registerToConceptId, callback) {
        var record = { ProjectTitle: project.title, ProjectDescription: project.description, ProjectStartDate: project.startDate,
         ProjectEndDate: project.endDate, ProjectStatus: project.projectStatus,ProjectURL:projectUrl,
        RegisterToConceptId:registerToConceptId,CreatedBy:user.userId};

        var query = db.query("insert into Project set ? ",
            record,
            function (error, results, fields) {
                if (error) {
                    console.log(query.sql)
                    console.log(error)

                    callback(error, null);

                } else {
                    console.log("results ", [results]);
                    callback(null, results.insertId);
                }


            });
    },


}
module.exports = ProjectModel;