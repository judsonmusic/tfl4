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
var DashboardComponent = (function () {
    function DashboardComponent(router, assessmentService, userService) {
        var _this = this;
        this.router = router;
        this.assessmentService = assessmentService;
        this.userService = userService;
        this.surveyComplete = false;
        this.router = router;
        this.assessmentService = assessmentService;
        this.areas = this.assessmentService.questions;
        this.assessmentData = [];
        this.userService = userService;
        this.dataCheckPassed = false;
        this.motivatedAreas = [];
        this.motivatedAreas2 = [];
        this.motivatedAreasNon = [];
        this.allGood = [];
        this.notGood = [];
        this.NONmotivatedAreas = [];
        this.seriesdata = [];
        this.userService = userService;
        this.allUnlocked = false;
        console.log('DASHBOARD');
        this.userService.getUser().subscribe(function (user) {
            console.log('DASHBOARD COMPONENT: checking user token');
            _this.userData = user;
        }, function (error) {
            console.log('Error fetching user data!');
        });
    }
    DashboardComponent.prototype.getOverAllScore = function () {
        var temp = [];
        this.userData.assessment.map(function (obj) {
            if (!isNaN(obj.answer)) {
                temp.push(obj.answer * 20);
            }
        });
        var sum = parseInt(temp.reduce(function (pv, cv) { return pv + cv; }, 0).toString());
        var avg = Math.floor(((sum / temp.length) + 1) / 10) * 10;
        return avg;
    };
    DashboardComponent.prototype.checkAllUnlocked = function () {
        var temp = [];
        this.userData.assessment.map(function (obj) {
            temp.push(obj.subs.indexOf(null) === -1);
        });
        this.allUnlocked = temp.indexOf(false) === -1;
        this.userData.steps[6] = this.allUnlocked;
    };
    DashboardComponent.prototype.updateStep = function (x) {
        //console.log('Update Steps', x);
        switch (x) {
            case 2:
                this.resultsIsOpen(true);
                break;
            case 3:
                this.djIsOpen(true);
                break;
            case 4:
                this.tflGuideIsOpen(true);
                break;
        }
        this.userData.steps[0] = null;
        this.userData.steps[x] = true;
        sessionStorage.setItem('steps', this.userData.steps.toString());
        this.updateUser();
    };
    DashboardComponent.prototype.updateUser = function () {
        var _this = this;
        this.userService.updateAccount(this.userData).subscribe(function (user) {
            _this.userData = user;
        });
    };
    DashboardComponent.prototype.checkComplete = function () {
        var complete = [];
        this.userData.survey.map(function (item, index) {
            //console.log(item);
            if (item.id != 101 && item.id != 100 && item.answer == "") {
                complete.push(false);
            }
            else {
                complete.push(true);
            }
        });
        //console.log('SURVEY: ' , complete);
        this.surveyComplete = complete.indexOf(false) == -1;
        if (this.surveyComplete) {
            this.userData.steps[5] = true;
            //console.log('The survey is complete. Lets update the account', this.userService.userData);
            this.updateUser();
        }
    };
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userData = this.userService.userData || [];
        this.assessmentData = this.userData.assessment || [];
        var temp = [];
        this.assessmentService.questions.map(function (x) {
            temp.push({ id: x.id, category: x.category });
        });
        this.categories = temp;
        //if I already have data from login, simply load it.
        this.userService.user$.subscribe(function (user) {
            console.log('user data retrieved...');
            _this.userData = user;
            _this.checkAllUnlocked();
        });
        this.checkComplete();
        this.buildSeries();
    };
    DashboardComponent.prototype.ngAfterViewInit = function () {
        this.userData = this.userService.userData || [];
        this.assessmentData = this.userData.assessment || [];
        if (typeof this.tooltip !== "undefined") {
        }
        if (typeof this.tooltip2 !== "undefined") {
        }
        // Another way to set attribute value to element
        // this.renderer.setElementAttribute(this.player, 'src', this.src);
    };
    DashboardComponent.prototype.buildSeries = function () {
        var _this = this;
        console.log('Bulding series...');
        //console.log('Build Series');
        //temp 2 represents the 6 sub questions. for building the chart, we iterate through these on each dimension.
        var temp2 = [];
        //the ones that are visible on the chart.
        var visibleItems = [1, 5];
        //for 5 subquestions...
        this.assessmentService.subquestions.map(function (x, i) {
            //this determined which items we want visible on the chart based on the array above. 1,5 is satisfaction and motivation.
            var visible = visibleItems.indexOf(i) > -1;
            temp2.push({ name: x.category, data: [], visible: visible, color: x.color });
        });
        //console.log(temp2);
        this.dataCheckPassed = true;
        //this.userData.steps[1] = true;//why am I doing this?
        this.updateUser();
        //console.log('TEMP 2 is: ', temp2);
        /*
         This is the original way...
         //for each of the items in assessment data...
         this.assessmentData.map((x) =>{

         if(x.subs.length == 0){ x.subs = [0,0,0,0,0,0]}//fix to ensure subs is pre-populated. 0 means no selection.

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

         });
         */
        //for each of the items in assessment data...
        //can we make this a temp array just for the charts?
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
                if (x.answer > 3 || x.subs[5] < 80 && x.subs.indexOf(null) === -1) {
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
        //console.log(temp2);
        this.seriesdata = temp2;
        //algorythms
        //1. dont need help
        //2. do need help.
        //AREAS THAT DO NOT NEED ATTENTION
        this.assessmentData.map(function (x) {
            //the answer is greater than 3 and subs are null
            if (x.answer > 3) {
                //this needs to be determined also by sub data. check to see if they have already answered and are not satisfied but motivated to take action.
                if (x.subs.indexOf(null) === -1 && x.subs[1] < 80 && x.subs[5] > 60) {
                    //after the fact...
                    _this.notGood.push(x);
                }
                else {
                    _this.allGood.push(x);
                }
            }
            else {
                _this.notGood.push(x);
            }
        });
        //console.log('ALL GOOD:', this.allGood);
        //console.log('NOT GOOD:', this.notGood);
        //now, out of the ones that are not good, lets see where they are motivated to change.
        this.allGood.map(function (x) {
            //if you are not satisfied but motivated
            //console.log('Satisfied:', x.subs[1], 'Motivated', x.subs[5]);
            if (x.subs[1] < 80 && x.subs[5] > 60) {
                if (x.subs.indexOf(null) === -1 && x.subs.indexOf(null).length === 6)
                    _this.motivatedAreas.push(x);
            }
            else {
                if (x.subs.indexOf(null) === -1 && x.subs.indexOf(null).length === 6)
                    _this.NONmotivatedAreas.push(x);
            }
        });
        //now, out of the ones that are not good, lets see where they are motivated to change.
        this.notGood.map(function (x) {
            //if you are not satisfied but motivated
            //console.log('Satisfied:', x.subs[1], 'Motivated', x.subs[5]);
            if (x.subs[1] < 80 && x.subs[5] > 60) {
                _this.motivatedAreas.push(x);
            }
            else {
                _this.NONmotivatedAreas.push(x);
            }
        });
        console.log('BAD AREAS:', this.notGood);
        //console.log('NON MOTIVATED AREAS:', this.NONmotivatedAreas);
        if (this.dataCheckPassed) {
            //they have completed everything...
            console.log('The data check passed!');
            this.userData.steps[1] = true;
            sessionStorage.setItem('steps', this.userData.steps);
            this.updateUser();
        }
    };
    DashboardComponent.prototype.goToDimension = function (id) {
        this.router.navigate(['/dimensions', id]);
    };
    DashboardComponent.prototype.takeAction = function () {
        this.router.navigate(['/action']);
    };
    //step 2
    DashboardComponent.prototype.tflGuideIsOpen = function (x) {
        var steps = [1];
        if (x && this.checkStepsFromStorage(steps)) {
            sessionStorage.setItem('tflGuideIsOpen', '1');
        }
        //console.log('tfl guide is open', typeof sessionStorage.getItem('tflGuideIsOpen') === "object");
        return typeof sessionStorage.getItem('tflGuideIsOpen') === "object";
    };
    //step 3
    DashboardComponent.prototype.resultsIsOpen = function (x) {
        var steps = [1, 2];
        if (x && this.checkStepsFromStorage(steps)) {
            sessionStorage.setItem('resultsIsOpen', '1');
        }
        //console.log('result is open', typeof sessionStorage.getItem('resultsIsOpen') === "object");
        return typeof sessionStorage.getItem('resultsIsOpen') === "object";
    };
    //step 4
    DashboardComponent.prototype.djIsOpen = function (x) {
        var steps = [1, 2, 3];
        if (x && this.checkStepsFromStorage(steps)) {
            sessionStorage.setItem('djIsOpen', '1');
        }
        //console.log('dj is open', typeof sessionStorage.getItem('djIsOpen') === "object");
        return typeof sessionStorage.getItem('djIsOpen') === "object";
    };
    //this will get the steps that they have taken.
    DashboardComponent.prototype.getStepsFromStorage = function () {
        if (!sessionStorage.getItem('steps')) {
            sessionStorage.setItem('steps', this.userData.steps);
        }
        return sessionStorage.getItem('steps').split(",").map(Boolean);
    };
    //TODO: need to check this algorithm.
    DashboardComponent.prototype.checkStepsFromStorage = function (steps) {
        var _this = this;
        var checkPassed = true;
        //steps are passed in to see if they exist in storage or not.
        steps.map(function (item) {
            if (!_this.getStepsFromStorage()[item]) {
                checkPassed = false;
            }
        });
        console.log('Check Passed ', checkPassed);
        return checkPassed;
    };
    DashboardComponent.prototype.getCurrentStep = function () {
        var tempSteps = [];
        this.getStepsFromStorage().map(function (step, index) {
            if (index > 0)
                tempSteps.push(step || false);
        });
        //console.log(tempSteps);
        return tempSteps.indexOf(false) + 1;
    };
    __decorate([
        core_1.ViewChild('tooltip'), 
        __metadata('design:type', Object)
    ], DashboardComponent.prototype, "tooltip", void 0);
    __decorate([
        core_1.ViewChild('tooltip2'), 
        __metadata('design:type', Object)
    ], DashboardComponent.prototype, "tooltip2", void 0);
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'dashboard',
            templateUrl: '/app/components/dashboard/dashboard.component.html',
        }), 
        __metadata('design:paramtypes', [router_1.Router, assessment_service_1.AssessmentService, user_service_1.UserService])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map