var express = require('express');
var router = express.Router();
var Account = require('../models/account');


/*TODO: right now we are getting the survey only here from accounts. Eventually need to move the data to its own collection*/
router.route('/')

    .get(function(req, res) {
        Account.distinct('companyCode', function(err, companies) {
            if (err) {
                res.send(err);
            } else {

               /*  var temp = [];
                companies.forEach((item)=>{

                    item = item.trim().toLowerCase()
                    temp.push(item);
                    //item = item.replace("^\\s*|\\s*$\g", "");
                    //console.log(item);


                });   
                
                Array.prototype.unique = function() {
                    var a = [];
                    for (i = 0; i < this.length; i++) {
                        var current = this[i];
                        if (a.indexOf(current) < 0) a.push(current);
                    }
                  
                    return a;
                };

                console.log(temp.unique()); */
                res.json(companies);                
            }
        });
    });

module.exports = router;