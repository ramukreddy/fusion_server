var express = require('express');
var Promise = require('promise');

var router = express.Router();
var ProjectModel = require('../model/ProjectModel')
var StudentCohortModel = require('../model/StudentCohortModel')

/* GET users listing. */
router.get('/:id?', function (req, res, next) {
  ProjectModel.findByProjectId(req.params.id, function (err, rows) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(rows);
    }
  });
});

router.get('/user/:id?', function (req, res, next) {
  var projects = {};
  var promises = getProjectsForUser(req.params.id)
    .then(resolve => {
      getStudentsForProjectId(resolve).then(projectWithStudents => {
        console.log("after getStudentsForProjectId " + projectWithStudents);
        res.json(projectWithStudents);
      })
    })
    .catch(error => {
      console.error(error);
      res.json(error);
    });;



}),

  router.get('/students/:id?', function (req, res, next) {
    var projects = {};
    var promises = getProjectsByStudentId(req.params.id)
      .then(resolve => {
        getStudentsForProjectId(resolve).then(projectWithStudents => {
          console.log("after getStudentsForProjectId " + projectWithStudents);
          res.json(projectWithStudents);
        })
      })
      .catch(error => {
        console.error(error);
        res.json(error);
      });;
  }),

  router.post('/', function (req, res) {
    var projectObj = JSON.parse(JSON.stringify(req.body));
    var user = projectObj.user;
    ProjectModel.addProject(projectObj, user, projectObj.projectUrl, projectObj.registerToConceptId, function (error, projectId) {
      if (error) {
        res.status(500);
        res.json({
          "status": 500,
          "message": error
        });
        return;
      } else {

        res.status(200);
        res.json({
          "status": 200,
          "message": "Project id : " + projectId
        });

      }

    });
  });

function getProjectsByStudentId(studentId) {
  return new Promise(
    function (resolve, reject) {

      ProjectModel.findByProjectsByStudentId(studentId, function (err, rows) {
        if (err) {
          reject(err);
        }
        else {
          resolve(rows);
        }
      });
    });
}
function getProjectsForUser(userId) {
  return new Promise(
    function (resolve, reject) {

      ProjectModel.findByProjectsByUserId(userId, function (err, rows) {
        if (err) {
          reject(err);
        }
        else {
          resolve(rows);
        }
      });
    });
}
function getStudentsForProjectId(projectRows) {
  var projects = [];
  return new Promise(function (resolve, reject) {
    var promises = projectRows.map(function (item) {
      var project = item;
      project["students"] = [];

      console.log("Items " + item.ProjectId);
      return StudentCohortModel.getAllStudentsForProjectId(item.ProjectId).then(projectStudents => {
        console.error(JSON.stringify(projectStudents));
        project.students = JSON.parse(JSON.stringify(projectStudents));
        projects.push(project);

      });


      // return new Promise(function (resolve, reject) {
      //   var projects = [];
      //   for (var i = 0; i < projectRows.length; i++) {
      //     var project = projectRows[i];
      //     project["students"] = [];
      //     var studentsResults = [];
      //     StudentCohortModel.getAllStudentsForProjectId(projectRows[i].ProjectId).then(projectStudents => {
      //       console.error(JSON.stringify(projectStudents));
      //       project.students = JSON.parse(JSON.stringify(projectStudents));

      //       projects.push(project);
      //       console.log(projects);

      //     }).catch(error => {
      //       console.error(error);
      //       projects.push(project);

      //     });
      // }



    });
    Promise.all(promises).then(function () {
      console.log("all promises finished " + JSON.stringify(projects));
      resolve(projects);
    });
  })
}
module.exports = router;
