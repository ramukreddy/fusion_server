var express = require('express');
var router = express.Router();
var Users = require('../model/UserModel')
/* GET users listing. */
router.get('/:id?', function (req, res, next) {
  Users.findByExternalId(req.params.id, function (err, rows) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(rows);
    }
  });
});

module.exports = router;
