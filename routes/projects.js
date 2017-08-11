var express = require('express');
var router = express.Router();
var ProjectModel = require('../model/ProjectModel')
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
  ProjectModel.findByProjectsByUserId(req.params.id, function (err, rows) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(rows);
    }
  });
});

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

module.exports = router;
