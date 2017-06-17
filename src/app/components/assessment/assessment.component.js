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
var user_service_1 = require("../user-service/user.service");
var auth_service_1 = require("../auth/auth.service");
var assessment_service_1 = require("../assessment/assessment.service");
var ng2_bootstrap_1 = require('ngx-bootstrap');
var AssessmentComponent = (function () {
    function AssessmentComponent(router, userService, authService, assessmentService, renderer) {
        this.router = router;
        this.userService = userService;
        this.authService = authService;
        this.assessmentService = assessmentService;
        this.renderer = renderer;
        this.count = 0;
        this.authService.redirectUrl = '/assessment';
        this.Math = Math;
        //console.log('the assessment componet loaded.');
        //array of answers they can select for main question.
        this.data = {};
        this.data.account = {};
        this.data.account.assessment = this.assessmentService.assessment;
        this.questions = this.assessmentService.questions;
        this.subquestions = this.assessmentService.subquestions;
        this.answers = this.assessmentService.answers;
        this.assessmentComplete = false;
    }
    AssessmentComponent.prototype.ngOnInit = function () {
        var _this = this;
        //console.log(this.userService.userData, this.data.account);
        this.data.account = this.userService.userData || this.data.account;
        //console.log('@@@@@SURVEY INIT!', this.data.account);
        this.userService.user$.subscribe(function (userData) {
            _this.data.account = userData;
            console.log('ACCOUNT INFORMATION ADDED!', _this.data.account);
            _this.checkComplete();
        });
        this.checkComplete();
    };
    AssessmentComponent.prototype.start = function () {
        this.count = 1;
    };
    AssessmentComponent.prototype.save = function () {
        var _this = this;
        //console.log('Saving Your Data!');
        //we need to add the assessment data to the account so it will get stored in use data;
        this.userService.updateAccount(this.data.account).subscribe(function (res) {
            //console.log('Data saved. Going to next slide.');
            _this.counterUp();
        }, function (err) { return console.log('There was an error!'); });
    };
    AssessmentComponent.prototype.updateSubs = function (value, assessmentIndex) {
        //we are using the 2nd value in the array to store satisfaction.
        assessmentIndex.subs = [null, (value * 20), null, null, null, null];
    };
    AssessmentComponent.prototype.counterUp = function () {
        if (this.count < this.questions.length) {
            this.count++;
        }
        else {
            this.count = 1;
        }
    }; //end counter
    AssessmentComponent.prototype.counterDown = function () {
        if (this.count > 1 && this.count <= this.questions.length) {
            this.count--;
        }
        else {
            this.count = 1;
        }
    }; //end counter
    AssessmentComponent.prototype.finish = function (ev) {
        var _this = this;
        ev.preventDefault();
        ev.stopPropagation();
        this.g.onShow.subscribe(function (hidden) {
            //console.log('The modal us showig!');
        });
        this.g.show();
        this.g.onHide.subscribe(function (hidden) {
            //console.log('The modal us hidden!');
            _this.save();
            _this.router.navigate(['dashboard']);
        });
    };
    AssessmentComponent.prototype.checkComplete = function () {
        console.log('Check completetion!');
        var tempComplete = [];
        this.data.account.assessment.map(function (item) {
            if (item.answer != "") {
                tempComplete.push(true);
            }
            else {
                tempComplete.push(false);
            }
        });
        if (tempComplete.indexOf(false) > -1) {
            this.assessmentComplete = false;
        }
        else {
            this.assessmentComplete = true;
        }
        console.log(tempComplete);
    };
    __decorate([
        core_1.ViewChild('g'), 
        __metadata('design:type', ng2_bootstrap_1.ModalDirective)
    ], AssessmentComponent.prototype, "g", void 0);
    AssessmentComponent = __decorate([
        core_1.Component({
            templateUrl: '/app/components/assessment/assessment.component.html',
        }), 
        __metadata('design:paramtypes', [router_1.Router, user_service_1.UserService, auth_service_1.AuthService, assessment_service_1.AssessmentService, core_1.Renderer])
    ], AssessmentComponent);
    return AssessmentComponent;
}());
exports.AssessmentComponent = AssessmentComponent;
//# sourceMappingURL=assessment.component.js.map