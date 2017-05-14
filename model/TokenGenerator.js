var uuid = require('node-uuid');
var TokenGenerator = {

    createVerificationToken: function (done) {
        var token = uuid.v4();

        return done( token);
        console.log("Verification token", token);
    }
}
module.exports = TokenGenerator;