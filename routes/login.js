var express = require('express');
var router = express.Router();
var auth = require('../controllers/auth');
/* check login . */
router.post('/', function(req, res) {
    var userObj = JSON.parse(JSON.stringify(req.body));

    if (userObj.username == '' || userObj.password == '') {
      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid credentials"
      });
      return;
    }
    auth.login(userObj.username,userObj.password, res);
});


module.exports = router;