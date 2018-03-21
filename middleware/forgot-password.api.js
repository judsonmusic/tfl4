var express = require('express');
var router = express.Router();
var Account = require('../models/account');
var bcrypt = require('bcrypt-nodejs');

router.use((req, res, next) => {
  app = req.app;
  next();
});
  

/**forgot password stuff... */
router.route('/:email/:access_id')
  .post(function (req, res) {
    var email = req.params.email;
    //console.log('Run Middleware for email...');
    //just send them password reset instructions
    app.runMiddleware('/api/email', {
      method: 'post',
      body: {
        "emails": [email],
        "title": "Password reset request.",
        "message": 'Please <a href="https://www.trainforlifeamerica.com/forgot-password/' + email + '/' + Date.now() + '">click here to reset your password</a>, if you did not inititate this request. Please contact info@trainforlifeamerica.com'
      }
    }, function (code, data) {
        //console.log(code, data);
      res.json({
        message: 'Password reset instructions sent to: ' + email,
        success: true
      });
      res.end();
      //process.exit() //this exits the worker process currently being used.
    });

  });//end forgot password...

module.exports = router;