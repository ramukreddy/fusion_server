var express = require('express');
var router = express.Router();
var companies = require('../model/CompanyModel')
var address = require('../model/AddressModel')

/* GET users listing. */
router.get('/:id?', function (req, res, next) {
  companies.findByCompanyId(req.params.id, function (err, rows) {
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

  var companyJson = JSON.stringify(req.body);
  var companyObj = JSON.parse(companyJson);

  var addressObj = companyObj.address;
  if (addressObj) {

    addAddress(addressObj, companyObj, addCompany, function (error, companyId) {
      if (error) {
        res.status(500);
        res.json(error);

      } else {
        res.status(200);
        res.json("Company is just added " + companyId);
      }

    });
  }

});

function addAddress(addressObj, companyObj, next, callback) {
  address.addAddress(addressObj, function (error, addressId) {
    if (error) {
      callback(error, null);
    }
    next(companyObj, addressId, callback)
  });

}
function addCompany(companyObj, addressId, callback) {
  companies.addCompany(companyObj.name, addressId, companyObj.industryType, function (error, companyId) {
    if (error) {
      callback(error, null);
    }
    else {
      callback(null, companyId);
    }
  });

}

// Add company 
router.post('/department', function (req, res, next) {

  var departmentJson = JSON.stringify(req.body);
  var departmentJson = JSON.parse(departmentJson);
  companies.addDepartmentToCompany(departmentJson.name, departmentJson.companyId, function (err, rows) {
    if (err) {
      res.json(err);
    }
    else {
      res.json("Successfully added, your company id is: " + rows);
    }
  });
});


module.exports = router;

// Sample requestes



/*

Add Company
{
  "name":"companyName",
  "industryType" : 1,
  address:{
    "street1":"Stree1 ",
    "city":"city",
    "state":"state",
    "postalcode":"postalcode"
  }

}
 Add department Department 
{
        "Name": "Name of the department",
        "companyId": 10001    

    }
*/