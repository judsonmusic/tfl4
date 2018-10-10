var express = require('express');
var router = express.Router();
var Account = require('../models/account');


/*TODO: right now we are getting the survey only here from accounts. Eventually need to move the data to its own collection*/
router.route('/')

    .get(function(req, res) {

        Account.aggregate([            
                      // Initial unwind
                {"$unwind": "$companyCode"},

                // Do your $addToSet part
                {"$group": {"_id": null, "companyCode": {"$addToSet": {$toLower: "$companyCode" }}}},
            
                // Unwind it again
                {"$unwind": "$companyCode"},
            
                // Sort how you want to
                {"$sort": { "companyCode": 1} },
            
                // Use $push for a regular array
                {"$group": { "_id": null, "companies": {"$push": "$companyCode" }}}  
            
        ]).exec(function(err, companies){

            if (err) {
                res.send(err);
            } else {
                res.json(companies[0].companies);   
            }
        });
    });



module.exports = router;