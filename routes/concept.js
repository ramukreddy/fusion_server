var express = require('express');
var router = express.Router();
var conceptModel = require('../model/ConceptModel')
/* GET  listing. */
router.get('/:id?', function (req, res, next) {
  conceptModel.findByConceptId(req.params.id, function (err, rows) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(rows);
    }
  });
});
router.get('/user/:id?', function (req, res, next) {
  conceptModel.getAllConcepts(function (err, rows) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(rows);
    }
  });
});
// get all registered concepts 

router.get('/registered/user/:id?', function (req, res, next) {

  conceptModel.getRegisteredConcept(req.params.id, function (err, rows) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(rows);
    }
  });
});
router.post('/', function (req, res, next) {
  var conceptJson = JSON.stringify(req.body);
  var conceptObject = JSON.parse(conceptJson);
  var userObject = conceptObject.user;
  var companyId;
  if (userObject && userObject.company) {
    companyId = userObject.company.companyId;
  }
  conceptModel.addConcept(conceptObject, userObject, companyId, function (err, rows) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(rows);
    }
  });
});

router.post('/register', function (req, res, next) {
  var conceptJson = JSON.stringify(req.body);
  var conceptObject = JSON.parse(conceptJson);
  var userId = conceptObject.userId;
  var conceptId = conceptObject.conceptId;

  conceptModel.registerToConcept(conceptId, userId, function (err, rows) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(rows);
    }
  });
});

module.exports = router;
