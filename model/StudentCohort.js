var db = require('../config/dbconnection'); //reference of dbconnection.js
var StudentCohortModel = {
    // this is expecting json object with multiple students,teacher id and project if they are assigned
    addStudentCohort: function (studentId, teacherId, projectId, callback) {

        var record = {
            StudentId: studentId, TeacherId: teacherId, ProjectId: ProjectId,
            CreatedBy: teacherId
        };

        var query = db.query("select StudentId, TeacherId, ProjectId from StudentCohort where StudentId = ? " +
            "and TeacherId = ? and ProjectId = ? "
            , [studentId, teacherId, ProjectId], function (error, results) {
                if (error) {
                    return callback(error, null);
                }
                if (!results.length > 0) {
                    var insertQueyry = db.query("insert into StudentCohort  set ? ", record, function (error, results) {
                        if (error) {
                            return callback(error, null);
                        }
                        callback(null,"success")
                    });


                }

            });
    }
}
module.exports = StudentCohortModel;