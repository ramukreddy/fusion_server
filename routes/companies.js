var express = require('express');
var router = express.Router();
var Companies = require('../model/CompanyModel')
/* GET users listing. */
router.get('/:id?', function (req, res, next) {
  Companies.findByCompanyId(req.params.id, function (err, rows) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(rows);
    }
  });
});

// Add company 
router.post('/', function (req, res, next) {
  Companies.addCompany(JSON.stringify(req.body), function (err, rows) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(rows);
    }
  });
});


module.exports = router;
