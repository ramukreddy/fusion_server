var jwt = require('jwt-simple');
var users = require('../model/UserModel')

var auth = {
  login: function (username, password, res) {
    
    // Fire a query to your DB and check if the credentials are valid
    auth.validate(username, password, function (dbUserObj) {
      if (dbUserObj.length <1) { // If authentication fails, we send a 401 back
        res.status(401);
        res.json({
          "status": 401,
          "message": "Invalid credentials"
        });
        return;
      }
      if (dbUserObj) {
        // If authentication is success, we will generate a token
        // and dispatch it to the client
        res.json(genToken(dbUserObj));
      }

    });

  },
  validate: function (username, password,callback) {
    var dbUserObj = users.validateUsernamePassword(username, password, function (err, data) {
      if (err) {
       console.log(err);
        return;
      }
      console.log("rows == >" + data);
      callback(data);
    });
  },

}
// private method
function genToken(user) {
  var expires = expiresIn(7); // 7 days
  var token = jwt.encode({
    exp: expires
  }, require('../config/secret')());
  return {
    token: token,
    expires: expires,
    user: user
  };
}
function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}
module.exports = auth;