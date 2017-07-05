var db = require('../config/dbconnection'); //reference of dbconnection.js
var StudentCohortModel = {
    // this is expecting json object with multiple students,teacher id and project if they are assigned
    addStudentCohort: function (studentId, teacherId, projectId, callback) {

        var record = {
            StudentId: studentId, TeacherId: teacherId, ProjectId: projectId,
            CreatedBy: teacherId, CohortStatus: 'Active'
        };

        var query = db.query("select StudentId, TeacherId, ProjectId from StudentCohort where StudentId = ? " +
            "and TeacherId = ? and ProjectId = ? "
            , [studentId, teacherId, projectId], function (error, results) {
                if (error) {
                    console.log(error);

                    callback(error, null);
                }
                if (results.length > 0) {
                    return callback("Student is already added to project", null);

                } else {
                    var insertQueyry = db.query("insert into StudentCohort  set ? ", record, function (error, results) {
                        if (error) {
                            console.log(error);
                            return callback(error, null);
                        }
                        if (results) {
                            console.log(results);

                            callback(null, "success")

                        }
                    });

                }

            });
    },

    getAllStudentsForTeacher: function (teacherId, callback) {

        var query = db.query("select user.FirstName,user.LastName,user.UserName as email,pj.ProjectTitle from User user,StudentCohort sc " +
            "left outer join Project pj on pj.ProjectId= sc.ProjectId " +
            " where sc.StudentId = user.UserId and sc.TeacherId = ? ",
            [teacherId], function (error, results) {
                if (error) {
                    return callback(error, null);
                } else {
                    return callback(null, results);

                }
            });

    },
    getAllStudentsForProjectId: function (projectId, callback) {

        var query = db.query("select user.FirstName,user.LastName,user.UserName as email,pj.ProjectTitle from User user,StudentCohort sc " +
            "join Project pj on pj.ProjectId= sc.ProjectID " +
            " where sc.StudentId = user.UserId and sc.projectId = ? ",
            [projectId], function (error, results) {
                if (error) {
                    return callback(error, null);
                } else {
                    return callback(null, results);

                }
            });

    },

    getAllStudentDetailsByStudentId: function (studentId, callback) {

        var query = db.query("select user.FirstName,user.LastName,user.UserName as email,pj.ProjectTitle from User user,StudentCohort sc " +
            "join Project pj on pj.ProjectId= sc.ProjectID " +
            " where sc.StudentId = user.UserId and user.UserId = ? ",
            [studentId], function (error, results) {
                if (error) {
                    return callback(error, null);
                } else {
                    return callback(null, results);

                }
            });

    }
}
module.exports = StudentCohortModel;