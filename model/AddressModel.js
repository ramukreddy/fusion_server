var db = require('../config/dbconnection'); //reference of dbconnection.js

var AddressModel = {

    findbyAddressId: function (addressId, callback) {

        return db.query("select addressId,Street1,Street2,City,State,PostalCode  from Address where addressId = ?", [addressId], function (error, results, fields) {
            if (error) {
                throw error;
            }
            callback(results);
        });
    },

    addAddress: function (address, callback) {
        //[address.street1, address.street2, address.city, address.state, address.postalcode]
        var record = { Street1: address.street1, Street2: address.street2, City: address.city, State: address.state, PostalCode: address.postalcode };
        var query = db.query("insert into Address Set ?",
            record, function (error, results, fields) {
                if (error) {
                    return callback(error, null);
                }

                return callback(null,results.insertId)
            });

    }
}
module.exports = AddressModel;