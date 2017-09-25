var express = require('express');
var router = express.Router();
var Account = require('../models/account');

function getAverage(array) {

    let values = array;
    let sum = values.reduce((previous, current) => current += previous);
    let avg = sum / values.length;
    return avg;
}

/*TODO: right now we are getting the assessment only here from accounts. Eventually need to move the data to its own collection*/
router.route('/stress-data')

    /*
        1 = strongly disagree
        2 = disagree 
        3 = neutral
        4 = agree &nbsp;&nbsp;&nbsp;&nbsp;&bull;&nbsp;&nbsp;&nbsp;&nbsp;
        5 = strongly agree
    */


    .get(function (req, res) {

        Account.find({}, { dimensions: 1 }, function (err, accounts) {
            if (err) {
                res.send(err);
            } else {
                //this will give us dimensions for each account, etc. Each dimension has an ID, for each ID push the score etc.
                var stressScores = {};
                accounts.map(function (account, accountIndex) {
                    if (account.dimensions) {
                        account.dimensions.map(function (dimension, dimensionIndex) {
                            //console.log(dimension.id, dimension.stressLevel);
                            if (!stressScores[dimension.id]) stressScores[dimension.id] = [];
                            if (dimension.stressLevel) stressScores[dimension.id].push(dimension.stressLevel)

                        });
                    }

                });

                //console.log('Stress Scores for each dimension', stressScores);
                var result = {

                    stats: {},
                    count: 15 //number of dimensions
                };

                for (var key in stressScores) {
                    if (stressScores.hasOwnProperty(key)) {

                        result.stats[key.replace('question', '')] = stressScores[key].reduce((r, k) => {
                            r[k] = 1 + r[k] || 1;
                            return r
                        }, {})

                    }
                }

                //console.log(result);

                /* var result = {};

                for (var key in stressScores) {
                    var obj = stressScores[key]; 
                    //console.log(key, getAverage(obj));   
                    result[key] = ((getAverage(obj) / 100) * 100).toFixed(2) + '%';    //Math.ceil((((count*100/15)/100) * 100)) + '%'   
                } */


                res.json(result);
            }
        });
    })

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
        }
        Account.find(function (err, accounts) {
            if (err) {
                res.send(err);
            } else {

                var assessments = [];

                accounts.map(function (item) {

                    if (checkAssessment(item.assessment)) {
                        assessments.push({
                            assessment: item.assessment
                        })
                    }

                });

                var answersArray = []

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
                            return r
                        }, {})

                    }
                }



                res.json(result);
            }
        });
    })



module.exports = router;