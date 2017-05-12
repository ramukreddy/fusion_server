var express = require('express');
var router = express.Router();
var ConceptModel = require('../model/CenceptModel')
/* GET users listing. */
router.get('/:id?', function (req, res, next) {
  ConceptModel.findByConceptId(req.params.id, function (err, rows) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(rows);
    }
  });
});
router.post('/', function (req, res, next) {
  ConceptModel.addConcept(JSON.stringify(req.body), function (err, rows) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(rows);
    }
  });
});


module.exports = router;
