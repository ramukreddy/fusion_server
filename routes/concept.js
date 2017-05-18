var express = require('express');
var router = express.Router();
var conceptModel = require('../model/ConceptModel')
/* GET users listing. */
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
router.get('/', function (req, res, next) {
  conceptModel.getAllConcepts(function (err, rows) {
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
  conceptModel.addConcept(conceptObject, function (err, rows) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(rows);
    }
  });
});


module.exports = router;
