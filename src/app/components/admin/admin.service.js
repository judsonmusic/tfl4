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
var http_1 = require('@angular/http');
var auth_service_1 = require("../auth/auth.service");
var assessment_service_1 = require("../assessment/assessment.service");
var survey_service_1 = require("../survey/survey.service");
var Subject_1 = require("rxjs/Subject");
var AdminService = (function () {
    function AdminService(http, authService, router, assessmentService, surveyService) {
        this.http = http;
        this.authService = authService;
        this.router = router;
        this.assessmentService = assessmentService;
        this.surveyService = surveyService;
        this.user = new Subject_1.Subject();
        this.loggedIn = new Subject_1.Subject();
        this.user = new Subject_1.Subject();
        this.user$ = this.user.asObservable();
        this.loggedIn = new Subject_1.Subject();
        this.loggedIn$ = this.loggedIn.asObservable();
    }
    AdminService.prototype.getUser = function () {
        var _this = this;
        var headers = new http_1.Headers();
        //headers.append('Content-Type', 'application/json');
        headers.append('x-access-token', sessionStorage['jwt']);
        //console.log('We have a user ID! Lets try to get a user!');
        return this.http
            .get('/api/accounts/' + sessionStorage['_id'], { headers: headers })
            .map(function (res) { return res.json(); })
            .map(function (res) {
            if (!res._id) {
                //console.log('***THERE WAS AN ERROR!');
                _this.authService.isLoggedIn = false;
            }
            else {
                //console.log('USER FOUND!', res);
                //this.authService.isLoggedIn = true;
                //this.loggedIn.next(true);
                //this.userData = res;
                //this.user.next(res);
                //this.surveyService.checkComplete(this.userData);
                return res;
            }
        }, function (error) { return console.log('There was an error', error); });
    };
    AdminService.prototype.getUsers = function () {
        var headers = new http_1.Headers();
        //headers.append('Content-Type', 'application/json');
        headers.append('x-access-token', sessionStorage['jwt']);
        //console.log('We have a user ID! Lets try to get a user!');
        return this.http
            .get('/api/accounts', { headers: headers })
            .map(function (res) { return res.json(); })
            .map(function (res) {
            return res;
        }, function (error) { return console.log('There was an error', error); });
    };
    AdminService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, auth_service_1.AuthService, router_1.Router, assessment_service_1.AssessmentService, survey_service_1.SurveyService])
    ], AdminService);
    return AdminService;
}());
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service.js.map