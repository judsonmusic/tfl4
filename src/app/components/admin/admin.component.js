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
var admin_service_1 = require("./admin.service");
var assessment_service_1 = require("../assessment/assessment.service");
var survey_service_1 = require("../survey/survey.service");
var router_1 = require("@angular/router");
var AdminComponent = (function () {
    function AdminComponent(adminService, assessmentService, surveyService, router) {
        var _this = this;
        this.adminService = adminService;
        this.assessmentService = assessmentService;
        this.surveyService = surveyService;
        this.router = router;
        this.adminService = adminService;
        this.assessmentService = assessmentService;
        this.surveyService = surveyService;
        this.router = router;
        this.adminService.getUser().subscribe(function (user) {
            if (user['admin']) {
                console.log(user['admin']);
                _this.adminService.getUsers().subscribe(function (users) {
                    _this.users = users;
                });
            }
            else {
                _this.router.navigate(['/dashboard']);
            }
        });
    }
    AdminComponent.prototype.ngOnInit = function () {
    };
    AdminComponent.prototype.viewUser = function (user) {
        var _this = this;
        //loop through assessment
        user['assessment'].map(function (obj) {
            console.log(obj);
            obj.questionValue = (_this.assessmentService.questions.filter(function (item) { return item.id === obj.id; })[0].question);
            obj.answerValue = (_this.assessmentService.answers.filter(function (item) { return item.id === obj.answer; })[0].value);
        });
        //loop through the survey..
        user['survey'].map(function (obj) {
            //obj.questionValue = (this.surveyService.questions.filter((item: any) => item.id === obj.id)[0].question);
            //if its less than 100, set the answer value to the answer given.
            if (obj.id < 100) {
                if (obj.answer) {
                    obj.answerValue = (_this.surveyService.answers.filter(function (item) { return item.id === obj.answer; })[0].value);
                }
                else {
                    obj.answerValue = 'No answer Provided.';
                }
            }
            else {
                obj.answerValue = obj.answer;
            }
        });
        this.user = user;
        //now that we have a user, we need to match the values to the assessment values for data.
    };
    AdminComponent = __decorate([
        core_1.Component({
            selector: 'admin-dashboard',
            templateUrl: '/app/components/admin/admin.component.tpl.html'
        }), 
        __metadata('design:paramtypes', [admin_service_1.AdminService, assessment_service_1.AssessmentService, survey_service_1.SurveyService, router_1.Router])
    ], AdminComponent);
    return AdminComponent;
}());
exports.AdminComponent = AdminComponent;
//# sourceMappingURL=admin.component.js.map