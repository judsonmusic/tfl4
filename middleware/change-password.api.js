var express = require('express');
var router = express.Router();
var Account = require('../models/account');
var bcrypt = require('bcrypt-nodejs');

router.use((req, res, next) => {
  app = req.app;
  next();
});


router.route('/')
    .post(function (req, res) {

    var password = req.body.password;
    var email = req.body.email;

    //now store the password:

    Account.findOne({
      email: email
    }).exec(function (err, account) {
      if (err)
        res.send(err);

      bcrypt.hash(password, null, null, function (err, hash) {
        //Store hash in your password DB.
        account.password = hash;
        // save the account
        account.save(function (err, response) {
          if (err) {
            res.send(err);
          } else {

            //just send them password reset instructions
            app.runMiddleware('/api/email', {
              method: 'post',
              body: {
                "emails": [email],
                "title": "Password Changes.",
                "message": 'Your password was successfully changed. If you did not inititate this request. Please contact info@trainforlifeamerica.com'
              }
            }, function (code, data) {
              res.json({
                message: 'Password change notification sent to: ' + email,
                success: true
              });
              res.end();
              //process.exit() //this exits the worker process currently being used.
            });
          }
        });
      });

    }); //find account..


  }); //end change password...


module.exports = router;
