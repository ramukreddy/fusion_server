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
            console.log("student id is paased");
            studentCohortModel.addStudentCohort(studentObject.studentId, studentCohortObject.teacherId, studentCohortObject.projectId,
                function (error, results) {
                    if (error) {
                        console.error(error);
                        res.status(500);
                        res.json({
                            "status": 500,
                            "message": error
                        });
                    }
                    if (results) {
                        console.log(results);
                        studentCohortModel.getAllStudentDetailsByStudentId(studentObject.studentId, function (error, results) {
                            if (error) {
                                console.log(results);

                            } else {
                                res.status(200);
                                res.json(results);
                            }
                        });


                    }
                });

        } else {
            user.inviteUserByEmailId(studentObject.firstName, studentObject.lastName, studentObject.emailId, function (error, userId) {
                if (error) {
                    console.error(error);

                    res.status(500);
                    res.json({
                        "status": 500,
                        "message": error
                    });
                    return res;
                }
                if (userId) {
                    console.log(userId);
                    // now we got student id from invitation, lets add to student cohort
                    studentCohortModel.addStudentCohort(userId, studentCohortObject.teacherId, studentCohortObject.projectId, function (error, results) {
                        if (error) {
                            console.error(error);

                            res.status(500);
                            res.json({
                                "status": 500,
                                "message": error
                            });
                        }
                        if (results) {
                            studentCohortModel.getAllStudentDetailsByStudentId(studentObject.studentId, function (error, results) {
                                if (error) {
                                    console.log(results);

                                } else {
                                    res.status(200);
                                    res.json(results);
                                }
                            });

                        }

                    });

                }
            });

        }
    }

});

router.get('/teacher/:id?/students', function (req, res, next) {
    var id = req.params.id;
    if (id) {
        studentCohortModel.getAllStudentsForTeacher(id, function (error, results) {
            if (error) {
                res.status(500);
                res.json(error);
            } else {
                res.status(200);
                res.json(results);

            }
        });
    } else {
        res.status(200);
    }
});

module.exports = router;
