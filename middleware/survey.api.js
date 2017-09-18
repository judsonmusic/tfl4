var express = require('express');
var router = express.Router();
var Account = require('../models/account');

/*TODO: right now we are getting the survey only here from accounts. Eventually need to move the data to its own collection*/
router.route('/')

    .get(function(req, res) {
        Account.find(function(err, accounts) {
            if (err) {
                res.send(err);
            } else {

                var temp = [];

                accounts.map(function(item) {

                    temp.push({
                        firstName: item.firstName,
                        lastName: item.lastName,
                        email: item.email,
                        occupation: item.occupation,
                        education: item.education,
                        hear: item.hear,
                        phone: item.phone,
                        assessment: item.assessment,
                        survey: item.survey,
                        dimensions: item.dimensions,
                        otherElements: item.otherElements,
                        steps: item.steps || []
                    })


                });
                res.json(temp);
            }
        });
    })

router.route('/aggregate')

    .get(function(req, res) {

        var checkSurvey = function(survey, length) {
            //console.log('Checking the survey..', survey);
            //loop trough the length of the survey to deteminted if completed.
            var surveyComplete = [];
            for (i = 0; i < length; i++) {
                surveyComplete.push(parseInt(fixAnswer(survey[i].answer)) > 0 || survey[i].id >= 100)
            }
            return surveyComplete.indexOf(false);
        }

        var fixAnswer = function(a) {
            var b = a;
            if (a.toString().toLowerCase() == "on") {
                console.log('Had to fix the answer...', a);
                b = 5;
            }
            return b;
        }

        Account.find(function(err, accounts) {
            if (err) {
                res.send(err);
            } else {

                var surveys = [];

                accounts.map(function(item) {
                    //console.log(item.survey);
                    if (item.survey) {
                        if (checkSurvey(item.survey, item.survey.length)) {
                            surveys.push({
                                survey: item.survey
                            })
                        }
                    }

                });

                var answersArray = []

                surveys.map(function(item, index) {
                    item.survey.map(function(item2, index2) {
                        if (item2.id < 100) answersArray.push({ questionId: item2.id, answer: fixAnswer(item2.answer) });
                    });
                });

                console.log(surveys);

                var somObj = {};

                answersArray.map(function(item, index) {

                    if (typeof somObj['question' + item.questionId] == "undefined") {
                        somObj['question' + item.questionId] = [];
                    }
                    //console.log(somObj['question' + item.questionId]);
                    somObj['question' + item.questionId].push(item.answer);

                });

                var result = {

                    stats: {},
                    count: surveys.length
                };

                for (var key in somObj) {
                    if (somObj.hasOwnProperty(key)) {

                        result.stats[key.replace('question', '')] = somObj[key].reduce((r, k) => {
                            r[k] = 1 + r[k] || 1;
                            return r
                        }, {})

                    }
                }



                res.json(result);
            }
        });
    })



module.exports = router;