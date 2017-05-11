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

        var query = db.query("insert into Address (Street1,Street2,City,State,PostalCode) values",
            [address.street1, address.street2, address.city, address.state, address.postalcode], function (error, results, fields) {
                if (error) {
                    return connection.rollback(function () {
                        throw error;
                    });
                }
                connection.commit(function (err) {
                    if (err) {
                        return connection.rollback(function () {
                            throw err;
                        });
                    }
                    callback(results.insertedid)
                });
            });

    }
}
module.exports = AddressModel;