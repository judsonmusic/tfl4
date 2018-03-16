var express = require('express');
var router = express.Router();
var Account = require('../models/account');

router.route('/birthyear')
  .post(function(req, res){

    //fromId, birthYear
    Account.findById(req.body.fromId, function(err, response){
      if(err){

        res.send(err);

      }else{

        if(response && parseInt(req.body.birthYear) === parseInt(response.birthDate.getFullYear())){

          res.json({success: true, message: "Validation Passed! Proceed!"}).end();

        }else{

          res.json({success: false, message: "Validation Failed!"}).end();

        }

      

      }
    });
  });


router.route('/email')
.post(function(req,res){

  Account.find({email : req.body.email}, function(err, account){
      if(err){
        
        res.send(err);

      }else{

        if(account.length > 0){

          res.send(true).end();

        }else{
          
          res.send(false).end();
        }
      }
    });

});

module.exports = router;

