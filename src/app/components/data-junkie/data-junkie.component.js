"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var assessment_service_1 = require("../assessment/assessment.service");
var user_service_1 = require("../user-service/user.service");
var survey_service_1 = require("../survey/survey.service");
var DataJunkieComponent = (function () {
    function DataJunkieComponent(router, assessmentService, userService, surveyService) {
        this.router = router;
        this.assessmentService = assessmentService;
        this.userService = userService;
        this.surveyService = surveyService;
        this.surveyComplete = false;
        this.router = router;
        this.assessmentService = assessmentService;
        this.areas = this.assessmentService.questions;
        this.userService = userService;
        this.userData = this.userService.userData || [];
        this.surveyService = surveyService;
        //re-direct if survey not complete.
        /*if(!this.surveyService.surveyComplete){
     
          this.router.navigate(['/dashboard']);
     
         }*/
    }
    DataJunkieComponent.prototype.checkComplete = function () {
        var complete = [];
        this.userService.userData.survey.map(function (item, index) {
            if (item.id != 101 && item.id != 100 && item.answer == "") {
                complete.push(false);
            }
            else {
                complete.push(true);
            }
        });
        this.surveyComplete = complete.indexOf(false) == -1;
        if (this.surveyComplete) {
            //console.log('The survey is complete. Lets update the account', this.userService.userData);
            this.userService.updateAccount(this.userService.userData).subscribe(function (user) {
                //console.log('Account updated with survey data!', user);
            });
        }
    };
    DataJunkieComponent.prototype.ngOnInit = function () {
        this.checkComplete();
        //if I already have data from login, simply load it.
        this.assessmentData = this.userService.userData.assessment || [];
        var temp = [];
        this.assessmentService.questions.map(function (x) {
            temp.push({ id: x.id, category: x.category });
        });
        this.categories = temp;
        //console.log('Categories: ', temp);
        this.buildSeries();
    };
    DataJunkieComponent.prototype.buildSeries = function () {
        var _this = this;
        //console.log('Build Series');
        var temp2 = [];
        //for 5 subquestions...
        this.assessmentService.subquestions.map(function (x, i) {
            //console.log('Row:', i, x);
            var visible = i == 0;
            temp2.push({ name: x.category, data: [], visible: true, color: x.color });
        });
        this.dataCheckPassed = true;
        //console.log('TEMP 2 is: ', temp2);
        var duplicateObject = JSON.parse(JSON.stringify(this.assessmentData));
        duplicateObject.forEach(function (x) {
            if (x.subs.length == 0) {
                x.subs = [null, null, null, null, null, null];
            } //fix to ensure subs is pre-populated. 0 means no selection.
            //if they have left and answer blank or a sub is not answered, datacheck has not passed.
            if (x.answer <= 3 && x.subs.indexOf(null) > -1) {
                _this.dataCheckPassed = false;
            }
            else {
                //here is where we can determined what we actually want to show on the chart. We need to set subs to [0,0,0,0,0,0] if they are satisfied and not motivated.
                //if satisfaction greater than neutral and motivation
                if (x.subs.indexOf(null) > -1) {
                    //todo: attempted to only show where they are not satisfied or arent motivated to change right now. its affecting the data on the view as well. The lock icons become grey. This is changing the data in the database :(
                    x.subs = [0, 0, 0, 0, 0, 0]; //TODO: this is changing the actual aseesment data :( need to change because its in a map function.//they are satisfied and not motivated to change.
                }
                //for each area on the series, we need to set what they selected from each area. 5 total. For example spiriitual.
                temp2.map(function (z, index) {
                    //in each of the 5 things, get the values by index.
                    //console.log('The data we are pushing to seriesData:', z);
                    z.data.push(x.subs[index]);
                });
            }
        });
        //for each of the items in assessment data...
        /*this.userData.assessment.map((x) =>{
    
          if(x.subs.length == 0){ x.subs = [null,null,null,null,null,null]} //fix to ensure subs is pre-populated. 0 means no selection.
    
          //if they have left and answer blank or a sub is not answered, datacheck has not passed.
          if(x.answer == "" || x.subs.indexOf(null) > -1){
    
            this.dataCheckPassed = false;
    
          }else {
    
            //for each area on the series, we need to set what they selected from each area. 5 total. For example spiriitual.
            temp2.map((z, index)=> {
              //in each of the 5 things, get the values by index.
              //console.log('The data we are pushing to seriesData:', z);
              z.data.push(x.subs[index]);
    
            });
    
          }
    
        });*/
        this.seriesdata = temp2;
        //console.log('SERIES DATA: ' , this.seriesdata); //only want the dimenstions thaty were populated!
    };
    DataJunkieComponent.prototype.goToDashboard = function () {
        this.router.navigate(['/dashboard']);
    };
    DataJunkieComponent = __decorate([
        core_1.Component({
            selector: 'dataJunkie',
            templateUrl: '/app/components/data-junkie/data-junkie.component.html',
        }), 
        __metadata('design:paramtypes', [router_1.Router, assessment_service_1.AssessmentService, user_service_1.UserService, survey_service_1.SurveyService])
    ], DataJunkieComponent);
    return DataJunkieComponent;
}());
exports.DataJunkieComponent = DataJunkieComponent;
//# sourceMappingURL=data-junkie.component.js.map