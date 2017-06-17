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
var TflGuideComponent = (function () {
    function TflGuideComponent(router, assessmentService, userService, surveyService) {
        this.router = router;
        this.assessmentService = assessmentService;
        this.userService = userService;
        this.surveyService = surveyService;
        this.router = router;
        this.assessmentService = assessmentService;
        this.areas = this.assessmentService.questions;
        this.userService = userService;
        this.userData = this.userService.userData;
        this.surveyService = surveyService;
        if (!this.surveyService.surveyComplete) {
        }
    }
    TflGuideComponent.prototype.ngOnInit = function () {
    };
    TflGuideComponent.prototype.goToDashboard = function () {
        this.router.navigate(['/dashboard']);
    };
    TflGuideComponent = __decorate([
        core_1.Component({
            selector: 'action',
            templateUrl: '/app/components/tfl-guide/tfl-guide.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, assessment_service_1.AssessmentService, user_service_1.UserService, survey_service_1.SurveyService])
    ], TflGuideComponent);
    return TflGuideComponent;
}());
exports.TflGuideComponent = TflGuideComponent;
//# sourceMappingURL=tfl-guide.component.js.map