var express = require('express');
var router = express.Router();
var Account = require('../models/account');

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
                        assessment: item.assessment,
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

     .get(function (req, res) {

       var checkAssessment = function(assessment, length) {
            //console.log('Checking the assessment..', assessment);
            //loop trough the length of the assessment to deteminted if completed.
            var assessmentComplete = [];
            for (i = 0; i < length; i++) {
                assessmentComplete.push(parseInt(fixAnswer(assessment[i].answer)) > 0 || assessment[i].id >= 100)
            }
            return assessmentComplete.indexOf(false);
        }

        var fixAnswer = function(a) {
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

                    if(checkAssessment(item.assessment)){
                        assessments.push({                   
                            assessment: item.assessment                 
                        })
                    }

                });

                var answersArray = [] 
                
                //var answersArray = [{qa: []}]               

                assessments.map(function(item, index){        
                    item.assessment.map(function(item2, index2){
                       if(item2.id < 100) answersArray.push({questionId: item2.id, answer: fixAnswer(item2.answer)});
                    });                    
                });  

                //console.log(assessments);

                var somObj = {};
            
                answersArray.map(function(item,index){
                       
                        if(typeof somObj['question' + item.questionId] == "undefined" ){
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
                          
                         result.stats[key.replace('question', '')] = somObj[key].reduce((r,k)=>{
                             r[k]=1+r[k]||1;     
                             return r
                            },{})
                           
                    }
                }

                

                res.json(result);
            }
        });
    })



module.exports = router;