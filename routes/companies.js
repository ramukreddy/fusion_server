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


  addAddress(companyObj, addCompany, function (error, companyId) {
    if (error) {
      res.status(500);
      res.json(error);

    } else {
      res.status(200);
      res.json("Company is just added " + companyId);
    }

  });
});

function addAddress(companyObj, next, callback) {
  var addressObj = companyObj.address;
  if (addressObj) {
    address.addAddress(addressObj, function (error, addressId) {
      if (error) {
        callback(error, null);
      }
      next(companyObj, addressId, callback)
    });
  } else {
    next(companyObj, null, callback)
  }


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
  var departmentObj= JSON.parse(departmentJson);
  companies.addDepartmentToCompany(departmentObj.name, departmentObj.companyId, function (err, rows) {
    if (err) {
      res.json(err);
    }
    else {
      res.json("Successfully added, your Department id is: " + rows);
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