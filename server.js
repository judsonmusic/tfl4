'use strict';

var express = require('express');
var http = require('http');
var moment = require('moment');
var open = require('open');
var path = require('path');
var morgan = require('morgan'); // formerly express.logger
var errorhandler = require('errorhandler');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Account = require('./models/account');
var router = express.Router();
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config/config'); // get our config file
var app = express();
var bcrypt = require('bcrypt-nodejs');
var cors = require("cors");
var survey = require("./middleware/survey.api");
var assessment = require("./middleware/assessment.api");
var dimensions = require("./middleware/dimensions.api");

mongoose.connect(config.database, function(err, res){

    console.log(err, res);
});
app.set('superSecret', config.secret);

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.json({
  limit: '50mb'
}));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}));
app.use(cors());

app.use(function (req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next()
});

router.get('/', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
  });



// route to authenticate a user (POST http://localhost:8080/api/authenticate)
router.post('/authenticate', function (req, res) {

    //console.log(req.body.password);

    // find the user
    Account.find({
        email: req.body.email
    }, function (err, account) {       

        if (account.length === 0) {

            return res.json({success: false, message: 'Account does not exist based on the email that you provided.'});

        } else {

            //console.log('THE DATA WE WILL COMPARE: ' , req.body.password.toString(), account[0].password.toString());
            //if we find the account by email, lets check the password against the hash.
            //we need the actual plain password for comparison...
            bcrypt.compare(req.body.password, account[0].password, function (err, res1) {                
                
                //console.log('bCrypt response: ', err, res1);

                if (res1) {

                    var token = jwt.sign({password: account[0].password}, app.get('superSecret'), {
                        expiresIn: 60 * 60 * 24 // expires in 24 hours
                    });

                    // return the information including token as JSON
                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token,
                        user: account
                    });


                } else {

                    res.json({
                        success: false,
                        message: 'Password Invalid'
                    });

                }


            });
        }


    });

    /*console.log('Trying to authenticate: ', req.body);

     // find the user
     Account.find({
     email: req.body.email,
     password: req.body.password
     }, function (err, account) {

    //console.log('THIS IS THE RESPONSE FROM LOGIN: ', err, account);

     if (err) {

     res.send(err);

     } else {

     if (account.length > 0) {


    //console.log('AN ACCOUNT WAS FOUND!', account);
    //console.log('We found an account!', account[0].password, req.body.password);
     // check if password matches
     if (account[0].password != req.body.password) {

     res.json({success: false, message: 'Authentication failed. Wrong password.'});

     } else {

     // if user is found and password is right
     // create a token
    //console.log('*****ACCOUNT', account);

     var token = jwt.sign({password: account[0].password}, app.get('superSecret'), {
     expiresIn: 9999 // expires in 24 hours
     });

     // return the information including token as JSON
     res.json({
     success: true,
     message: 'Enjoy your token!',
     token: token,
     user: account
     });
     }

     } else {

     //error handler for no account found
     res.json({success: false, message: 'No account was found matching the information that you provided.'});

     }
     }

     });*/
});////////

////TOKEN AUTH////////////////////////////////////////////////////
// route middleware to verify a token, dont need this for things like create account etc..
router.use(function (req, res, next) {
    //console.log('Trying to hit url!', req.url);
    var publicUrls = ['/accounts', '/reports'];
    if (publicUrls.indexOf(req.url.split("/") > -1)) {

        //this is a public url
        next();

    } else {
        // check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        //console.log('Route', token);
        // decode token
        if (token) {

            // verifies secret and checks exp
            jwt.verify(token, app.get('superSecret'), function (err, decoded) {
                if (err) {
                    return res.json({success: false, message: 'Failed to authenticate token.'});
                } else {
                    // if everything is good, save to request for use in other routes
                    //console.log('Your token is valid!');
                    req.decoded = decoded;
                    next();
                }
            });

        } else {

            // if there is no token
            // return an error
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });

        }
    }
});
///////////////////////////////////////////////////////////////

router.route('/reports/:question_id/:sub_index')
    .get(function (req, res, next) {


        //console.log(req.params.question_id);

        var matchStage = {"$match": {"assessment.id": +req.params.question_id}};//1 would be nutrition

        var query = [

            [
                matchStage,
                {$unwind: "$assessment"},
                matchStage,
                {
                    $project: {
                        id: "$assessment.id",
                        answer: "$assessment.answer",
                        subs: {"$avg": {$slice: ["$assessment.subs", +req.params.sub_index, 1]}}
                    }
                }
            ]
            // {$unwind: "$assessment"},
            // {$unwind: "$assessment.subs"},
            //
            // // group back into single docs, projecting the first and last
            // // coordinates as lng and lat, respectively
            // matchStage,
            // {$group: {
            //   _id: "$_id",
            //   lng: {$first: "$assessment.subs"}//first is how balanced you are.
            // }},
            // // then group as normal for the averaging
            // {$group: {
            //   _id: 0,
            //   lngAvg: {$avg: "$lng"}
            // }}
        ];

        Account.aggregate(query, function (err, result) {
            if (err)
                res.send(err);

            res.json(result);
            res.end();
        });

    });
//end reports

router.route('/accounts/delete')
.put(function(req,res){
        //console.log('Attempting Delete', req.body._id);
        // use our account model to find the account we want
        Account.findById(req.body._id, function (err, account) {

           

            if (err)
                return res.send(err); 


            // save the account
            account.deleted = true;
            account.save(function (err, account) {
                if (err)
                    return res.send(err);

                res.json({success: true, message: 'Account deleted!', account: account}).end();

            });

        });

});


router.route('/accounts')

// get all the accounts (accessed at GET http://localhost:8080/api/accounts)
    .get(function (req, res) {
        Account.find({deleted: {$ne: true}}, function (err, accounts) {
            if (err) {
                res.send(err);
            } else {

                var temp = [];

                accounts.map(function (item) {

                    //console.log(item._id);

                    temp.push({
                        _id: item._id,
                        firstName: item.firstName,
                        lastName: item.lastName,
                        email: item.email,
                        gender: item.gender,
                        birthDate: item.birthDate,
                        age: moment.isDate(item.birthDate) && moment.isDate(item.createdAt) ? moment(item.createdAt).diff(item.birthDate, 'years',false) : 'Unknown',
                        occupation: item.occupation,
                        education: item.education,
                        ethnicity: item.ethnicity,
                        income: item.income,
                        hear: item.hear,
                        phone: item.phone,
                        assessment: item.assessment,
                        survey: item.survey,
                        dimensions: item.dimensions,
                        otherElements: item.otherElements,
                        steps: item.steps || [],
                        companyCode: item.companyCode || 'betatester'
                    })


                });
                res.json(temp);
            }
        });
    })
    // create a account (accessed at POST http://localhost:8080/api/accounts)
    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function (req, res) {
        //console.log('Create New Account: ', req.body);
        var account = new Account();      // create a new instance of the Bear model
        //console.log(account);
        account.companyCode = req.body.companyCode;
        account.firstName = req.body.firstName;
        account.lastName = req.body.lastName;
        account.email = req.body.email;
        account.birthDate = req.body.birthDate;
        account.gender = req.body.gender;
        account.occupation = req.body.occupation;
        account.education = req.body.education;
        account.ethnicity = req.body.ethnicity;
        account.income = req.body.income;
        account.hear = req.body.hear;
        account.phone = req.body.phone;
        account.username = req.body.username;
        account.password = req.body.password;
        account.assessment = req.body.assessment;
        account.survey = req.body.survey;
        account.dimensions = req.body.dimensions;
        account.otherElements = req.body.otherElements;
        account.steps = new Array(7);
        //console.log('SENDING: ', account);

        //before we proceed do we have an account?
        Account.find({
            email: req.body.email
        }, function (err, response) {

            if (err) {

                res.send(err);

            } else {
                //if we found an account...

                //console.log('Here is your response!', response);

                if (response.length > 0) {

                    //console.log('WE FOUND AN EMAIL!!');

                    res.json({message: 'Account already exists.', success: false});
                    res.end();

                } else {


                    bcrypt.hash(account.password, null, null, function (err, hash) {
                        //bcrypt.hash(account.password, saltRounds, function (err, hash) {//old bcrypt
                        // Store hash in your password DB.
                        account.password = hash;
                        // save the account
                        // save the bear and check for errors
                        account.save(function (err) {
                            if (err)
                                res.send(err);

                            res.json({message: 'Account created!', account: account});
                            res.end();
                        });
                    });


                }


            }
        });//end find duplicate account.


    });//end accounts


// on routes that end in /accounts/:account_id
// ----------------------------------------------------
router.route('/accounts/:account_id')

// get the account with that id (accessed at GET http://localhost:8080/api/accounts/:account_id)
    .get(function (req, res) {
        //console.log('ATTEMPTING TO FIND BY ID!', req);
        Account.findById(req.params.account_id, function (err, account) {

           //console.log(account);

            if (typeof account !== "undefined" && (typeof account.steps === "undefined" || account.steps.length === 0 || account.steps.length < 7)) {

               //console.log('Adding steps array to account.');

                account.steps = new Array(7);
                account.save(function (err, account) {
                    if (err)
                        return res.send(err);
                    res.json(account).end;

                });

            } else {

                if (err)
                    return res.send(err);
                res.json(account).end;
            }


        });
    })

    // update the account with this id (accessed at PUT http://localhost:8080/api/accounts/:account_id)
    .put(function (req, res) {
        //console.log('Attempting Put', req.body);
        // use our account model to find the account we want
        Account.findById(req.params.account_id, function (err, account) {

            if (err)
                return res.send(err);
            account.companyCode = req.body.companyCode;
            account.firstName = req.body.firstName;
            account.lastName = req.body.lastName;
            account.email = req.body.email;
            account.occupation = req.body.occupation;
            account.education = req.body.education;
            account.hear = req.body.hear;
            account.phone = req.body.phone;
            account.username = req.body.username;
            account.password = req.body.password;
            account.monthlyExpenses = req.body.monthlyExpenses;
            account.date = req.body.date;
            account.assessment = req.body.assessment;
            account.survey = req.body.survey;
            account.dimensions = req.body.dimensions;
            account.otherElements = req.body.otherElements;
            account.steps = req.body.steps || [];


            // save the account
            account.save(function (err, account) {
                if (err)
                    return res.send(err);

                res.json({message: 'Account updated!', account: account}).end;

            });

        });
    })

    // delete the account with this id (accessed at DELETE http://localhost:8080/api/accounts/:account_id)
    .delete(function (req, res) {
        Account.remove({
            _id: req.params.account_id
        }, function (err, account) {
            if (err)
                return res.send(err);

            res.json({message: 'Successfully deleted'}).end;
        });
    });


/**SERVER*************************************/
// all environments
app.set('port', process.env.PORT || 3333);
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);

// express/connect middleware
app.use(morgan('dev'));


// serve up static assets
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/api', router);
app.use('/api/survey', survey);
app.use('/api/assessment', assessment);
app.use('/api/dimensions', dimensions);
var a = ['*', '!/api'];
//all get requests resolve to index.
app.get('*', (req, res) => {
    //console.log('THE URL WE ARE TRYING TO GET IS:', req.url, path.join(__dirname, 'dist/index.html'));
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// development only
if ('development' === app.get('env')) {
    app.use(errorhandler());
}

http.createServer(app).listen(app.get('port'), function () {
    //open("http://localhost:" + app.get('port'));
   console.log('myApp server listening on port ' + app.get('port'));
});
/**END SERVER*************************************/








