var express = require('express');
var router = express.Router();
var Account = require('../models/account');
var Assessments = require('../models/assessments');
var moment = require('moment');
var mongoose = require('mongoose');

router.route('/deleteAssessment/:assessmentId')

.put(function(req, res){

    Assessments.findById(req.params.assessmentId, function (err, assessment) {

        if (err)
            return res.send(err);
            assessment.deleted = true;
            assessment.dateDeleted = Date.now();
            // save the account
            assessment.save(function (err, saved) {
                if (err)
                    return res.send(err);

                res.json({
                    message: 'Assessment deleted!',
                    assessment: saved
                }).end();

            });
        
    });

});

router.route('/updateAssessment/:assessmentId')
    // update the account with this id (accessed at PUT http://localhost:8080/api/accounts/:account_id)
    .put(function (req, res) {
        //console.log('Attempting Put', req.body);
        // use our account model to find the account we want
        Assessments.findById(req.params.assessmentId, function (err, assessment) {

            if (err)
                return res.send(err);

            assessment.updatedAt = moment();
            if (req.body.assessment) assessment.assessment = req.body.assessment;
            if (req.body.survey) assessment.survey = req.body.survey;
            if (req.body.dimensions) assessment.dimensions = req.body.dimensions;
            if (req.body.otherElements) assessment.otherElements = req.body.otherElements;
            assessment.steps = req.body.steps || [];


            // save the account
            assessment.save(function (err, saved) {
                if (err)
                    return res.send(err);

                res.json({
                    message: 'Assessment updated!',
                    assessment: saved
                }).end();

            });

        });
    });


router.route('/createAssessment')
    // update the account with this id (accessed at PUT http://localhost:8080/api/accounts/:account_id)
    .post(function (req, res) {
        //console.log('Attempting Put', req.body);

        var assessment = new Assessments();
        assessment.assessment = req.body.assessment;
        assessment.survey = req.body.survey;
        assessment.dimensions = req.body.dimensions;
        assessment.otherElements = req.body.otherElements;
        assessment.steps = new Array(7);
        assessment.user_id = req.body.user_id;


        // save the account
        assessment.save(function (err, saved) {
            if (err)
                return res.send(err);

            res.json({
                message: 'Assessment created!',
                assessment: saved
            }).end();

        });


    });

/*TODO: right now we are getting the assessment only here from accounts. Eventually need to move the data to its own collection*/
router.route('/')

    .get(function (req, res) {
        Account.find(function (err, accounts) {
            if (err) {
                res.send(err);
            } else {

                var temp = [];

                accounts.map(function (item) {

                    temp.push({
                        firstName: item.firstName,
                        lastName: item.lastName,
                        email: item.email,
                        occupation: item.occupation,
                        education: item.education,
                        hear: item.hear,
                        phone: item.phone,
                        assessment: item.assessment,
                        dimensions: item.dimensions,
                        otherElements: item.otherElements,
                        steps: item.steps || []
                    })


                });
                res.json(temp);
            }
        });
    });

/*TODO: right now we are getting the assessment only here from accounts. Eventually need to move the data to its own collection*/
router.route('/getByUserId/:user_id/:assessment_id?')

    .get(function (req, res) {        
        //console.log( mongoose.Types.ObjectId('578df3efb618f5141202a196') );
        var id =  req.params.user_id;
        var query = { user_id: id, deleted: { $ne: true } };
        if (req.params.assessment_id){
            query = { user_id: id, _id: req.params.assessment_id, deleted: { $ne: true } };
        }
        Assessments.find(query).sort({ "createdAt": -1 }).exec(function (err, assessments) {
            if (err) {
                res.send(err);
            } else {

                res.status(200).send(assessments);

                /* var temp = [];

                assessment.map(function (item) {

                    temp.push({
                        firstName: item.firstName,
                        lastName: item.lastName,
                        email: item.email,
                        occupation: item.occupation,
                        education: item.education,
                        hear: item.hear,
                        phone: item.phone,
                        assessment: item.assessment,
                        dimensions: item.dimensions,
                        otherElements: item.otherElements,
                        steps: item.steps || []
                    });


                });
                res.json(temp); */

            }
        });
    });

router.route('/aggregate')

    .get(function (req, res) {

        var checkAssessment = function (assessment, length) {
            //console.log('Checking the assessment..', assessment);
            //loop trough the length of the assessment to deteminted if completed.
            var assessmentComplete = [];
            for (i = 0; i < length; i++) {
                assessmentComplete.push(parseInt(fixAnswer(assessment[i].answer)) > 0 || assessment[i].id >= 100)
            }
            return assessmentComplete.indexOf(false);
        }

        var fixAnswer = function (a) {
            var b = a;
            if (a.toString().toLowerCase() == "on") {
                //console.log('Had to fix the answer...', a);
                b = 5;
            }
            return b;
        };
        Account.aggregate(
            [{$lookup:{
                from: "assessments",
                localField: "_id", //this is the _id user from tests
                foreignField: "user_id", //this is the _id from users
                as: "assessmentData"
        }}]
        )
        .exec(function(err, accounts) {
            if (err) {
                res.send(err);
            } else {
                //TODO: because we created the ability to retake the assessment, we need to fix this to pull all of the assessments based on ids etc...
                console.log(accounts);

               /*  //now that we have accounts we need to get assessments for each account i

                var assessments = [];
                //TODO, item assessment does not exist anymore we need to joing assessments...
                accounts.map(function (item) {

                    if (checkAssessment(item.assessment)) {
                        assessments.push({
                            assessment: item.assessment
                        });
                    }

                });
                console.log(assessments);

                var answersArray = [];

                //var answersArray = [{qa: []}]               

                assessments.map(function (item, index) {
                    item.assessment.map(function (item2, index2) {
                        if (item2.id < 100) answersArray.push({ questionId: item2.id, answer: fixAnswer(item2.answer) });
                    });
                });

                //console.log(assessments);

                var somObj = {};

                answersArray.map(function (item, index) {

                    if (typeof somObj['question' + item.questionId] == "undefined") {
                        somObj['question' + item.questionId] = [];
                    }
                    //console.log(somObj['question' + item.questionId]);
                    somObj['question' + item.questionId].push(item.answer);

                });

                var result = {

                    stats: {},
                    count: assessments.length
                };

                for (var key in somObj) {
                    if (somObj.hasOwnProperty(key)) {

                        result.stats[key.replace('question', '')] = somObj[key].reduce((r, k) => {
                            r[k] = 1 + r[k] || 1;
                            return r;
                        }, {});

                    }
                } */



                res.json(accounts);
            }
        });
    });



module.exports = router;