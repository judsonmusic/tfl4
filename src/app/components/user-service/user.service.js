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
var dimension_service_1 = require("../dimension-service/dimension.service");
var Subject_1 = require("rxjs/Subject");
var UserService = (function () {
    function UserService(http, authService, router, assessmentService, surveyService, dimensionService) {
        this.http = http;
        this.authService = authService;
        this.router = router;
        this.assessmentService = assessmentService;
        this.surveyService = surveyService;
        this.dimensionService = dimensionService;
        this.user = new Subject_1.Subject();
        this.loggedIn = new Subject_1.Subject();
        this.user = new Subject_1.Subject();
        this.user$ = this.user.asObservable();
        this.loggedIn = new Subject_1.Subject();
        this.loggedIn$ = this.loggedIn.asObservable();
    }
    UserService.prototype.getUser = function () {
        var _this = this;
        console.log('USER SERVICE: get user...');
        var headers = new http_1.Headers();
        //headers.append('Content-Type', 'application/json');
        headers.append('x-access-token', sessionStorage.getItem('jwt'));
        //console.log('We have a user ID! Lets try to get a user!');
        return this.http
            .get('/api/accounts/' + sessionStorage.getItem('_id'), { headers: headers })
            .map(function (res) { return res.json(); })
            .map(function (res) {
            if (!res._id) {
                console.log('***THERE WAS AN ERROR!');
                _this.authService.isLoggedIn = false;
            }
            else {
                console.log('USER SERVICE: user was found.');
                _this.authService.isLoggedIn = true;
                _this.loggedIn.next(true);
                _this.userData = res;
                _this.user.next(res);
                if (typeof _this.userData.dimensions.length === "undefined" || _this.userData.dimensions.length < 15) {
                    _this.userData.dimensions = _this.dimensionService.dimensions;
                }
                _this.surveyService.checkComplete(_this.userData);
                _this.user.next(res);
                return res;
            }
        }, function (error) { return console.log('There was an error', error); });
    };
    UserService.prototype.createAccount = function (user) {
        var _this = this;
        user.assessment = this.assessmentService.assessment;
        user.survey = this.surveyService.survey;
        user.dimensions = this.dimensionService.dimensions;
        //console.log('Build empty assessment: ' , user.assessment);
        //console.log('Attempting to create an account with', user);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .post('/api/accounts', JSON.stringify(user), { headers: headers })
            .map(function (res) { return res.json(); })
            .map(function (res) {
            if (res['account']) {
                console.log('Account created!', res["account"]);
                _this.authService.isLoggedIn = true;
                _this.loggedIn.next(true);
                _this.userData = res["account"];
                //this.user$ = this.userData;
                _this.user.next(_this.userData);
                return res;
            }
            else {
                _this.authService.isLoggedIn = false;
                return res;
            }
        });
    };
    UserService.prototype.login = function (user) {
        var _this = this;
        console.log('Loggin you in...');
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .post('/api/authenticate', JSON.stringify(user), { headers: headers })
            .map(function (res) { return res.json(); })
            .map(function (res) {
            if (res['success'] == true) {
                sessionStorage.setItem('jwt', res.token);
                sessionStorage.setItem('_id', res.user[0]._id);
                //set user service info...
                _this.loggedIn.next(true);
                _this.userData = res.user[0];
                _this.surveyService.checkComplete(_this.userData);
                if (typeof _this.userData.dimensions.length === "undefined" || _this.userData.dimensions.length < 15) {
                    _this.userData.dimensions = _this.dimensionService.dimensions;
                }
                _this.user.next(res.user[0]);
                return res;
            }
            else {
                return res;
            }
        });
    };
    UserService.prototype.logout = function () {
        sessionStorage.clear();
        sessionStorage.clear();
        this.userData = null;
        this.authService.isLoggedIn = false;
        this.loggedIn.next(false);
    };
    UserService.prototype.updateAccount = function (user) {
        var _this = this;
        //console.log('Updating Account', user);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('x-access-token', sessionStorage.getItem('jwt'));
        return this.http
            .put('/api/accounts/' + user._id, JSON.stringify(user), { headers: headers })
            .map(function (res) { return res.json(); })
            .map(function (res) {
            //console.log('**********', res['account']);
            if (typeof res["account"] !== "undefined") {
                _this.userData = res["account"];
                _this.user.next(res['account']);
                return res['account'];
            }
            else {
                return _this.userData;
            }
        });
    };
    UserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, auth_service_1.AuthService, router_1.Router, assessment_service_1.AssessmentService, survey_service_1.SurveyService, dimension_service_1.DimensionService])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map