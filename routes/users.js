var express = require('express');
var router = express.Router();
var User = require('../model/UserModel')
/* GET users listing. */
router.get('/:id?', function (req, res, next) {
  User.findByUserId(req.params.id, function (err, rows) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(rows);
    }
  });
});

router.get('/token/:id?', function (req, res, next) {
  User.findByInviteeToken(req.params.id, function (err, rows) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(rows);
    }
  });
});

router.post('/inviteUserByEmail', function (req, res) {
  var userObj = JSON.parse(JSON.stringify(req.body));

  User.inviteUserByEmailId(userObj.firstName, userObj.lastName, userObj.email, function (error, userId) {
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
        "message": "User id for invited user is " + userId
      });

    }

  });
});

router.put('/', function (req, res) {
  var userObj = JSON.parse(JSON.stringify(req.body));

  User.updateUser(userObj, function (error, userId) {
    if (error) {
      console.log(error);
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
        "message": "User id : " + userId
      });

    }

  });
});

router.post('/', function (req, res) {
  var userObj = JSON.parse(JSON.stringify(req.body));

  User.saveUser(userObj, function (error, userId) {
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
        "message": "User id : " + userId
      });

    }

  });
});



module.exports = router;
