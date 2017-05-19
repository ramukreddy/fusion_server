var express = require('express');
var router = express.Router();
var user = require('../model/UserModel');
var studentCohortModel = require('../model/StudentCohortModel');
var returnData = {};

router.post('/', function (req, res, next) {
    var studentCohortJson = JSON.stringify(req.body);
    var studentCohortObject = JSON.parse(studentCohortJson);

    var students = studentCohortObject.students;
    for (var student in students) {
        console.log(student + ": " + students[student].studentId);
        var studentObject = students[student];
        // if we already have studnet id just add them, otherwise invite them via email.

        if (studentObject.studentId) {
            studentCohortModel.addStudentCohort(studentObject.studentId, studentCohortObject.teacherId, studentCohortObject.projectId,
                function (error, results) {
                    return error;
                });
        } else {
            user.inviteUserByEmailId(null, null, studentObject.emailId, function (error, results) {
                if (error) {
                    return error;

                }
                // now we got student id from invitation, lets add to student cohort
                studentCohortModel.addStudentCohort(results.insertId, studentCohortObject.teacherId, studentCohortObject.projectId, function (error, results) {
                    if (error) {
                        return error;

                    }
                });


            });

        }
    }


    res.sendStatus(200);

});

router.get('/teacher/:id/students', function (req, res, next) {

    if (id) {
        studentCohortModel.getAllStudentsForTeacher(id, function (error, results) {
            if (error) {
                res.statusCode(500);
                res.json(error);
            } else {
                res.statusCode(200);

                res.json(restults);

            }
        });
    } else {
        res.sendStatus(200);

    }



});

module.exports = router;
