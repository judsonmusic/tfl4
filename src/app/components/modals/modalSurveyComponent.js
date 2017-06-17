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
var router_1 = require("@angular/router");
var ng2_bootstrap_1 = require('ngx-bootstrap');
var user_service_1 = require("../user-service/user.service");
var survey_service_1 = require("../survey/survey.service");
//declare var $:JQueryStatic;
var ModalSurveyComponent = (function () {
    function ModalSurveyComponent(userService, surveyService, router) {
        this.userService = userService;
        this.surveyService = surveyService;
        this.router = router;
        this.userService = userService;
        this.surveyService = surveyService;
        this.survey_questions = surveyService.questions;
        this.survey_answers = surveyService.answers;
        this.userData = userService.userData;
        if (this.userData.survey.length <= 0) {
            this.userData.survey = this.surveyService.survey;
        }
    }
    ModalSurveyComponent.prototype.checkComplete = function () {
        //really need to chane this to use angularl elementRef
        var _this = this;
        $('.modal.in').animate({ scrollTop: $('.modal.in').scrollTop() + 50 });
        //$('.modal.open').animate({ scrollTop: $('.modal').height() }, 'fast');
        var complete = [];
        this.userData.survey.map(function (item, index) {
            if (item.id == 101 || item.id == 100 || item.answer != "") {
                complete.push(true);
            }
            else {
                complete.push(false);
            }
        });
        //console.log(complete);
        this.surveyComplete = complete.indexOf(false) == -1;
        //console.log(this.surveyComplete);
        if (this.surveyComplete) {
            //console.log('The survey is complete. Lets update the account', this.userData);
            this.userData.steps[5] = true;
            this.userService.updateAccount(this.userData).subscribe(function (user) {
                _this.surveyService.surveyComplete = true;
                sessionStorage.setItem('steps', _this.userData.steps);
                //console.log('Account updated with survey data!', user);
            });
        }
    };
    ModalSurveyComponent.prototype.updateSurvey = function (ev, id) {
        this.surveyComplete = true;
        //console.log('Attempting to update', ev, id);
        var itemExists = false;
        this.userData.survey.map(function (item, index) {
            if (item.id == id) {
                itemExists = true;
                item.answer = ev.target.value;
            }
        });
        itemExists = false;
        this.checkComplete();
    };
    ModalSurveyComponent.prototype.getSurveyAnswer = function (id) {
        return this.userData.survey.find(function (s) { return s.id == id; }).answer;
    };
    ModalSurveyComponent.prototype.show = function () {
        this.lgModal.show();
        this.checkComplete();
    };
    ModalSurveyComponent.prototype.showChildModal = function () {
        this.childModal.show();
    };
    ModalSurveyComponent.prototype.hideChildModal = function () {
        this.childModal.hide();
    };
    ModalSurveyComponent.prototype.ngAfterViewInit = function () {
        this.checkComplete();
    };
    ModalSurveyComponent.prototype.completeSurvey = function () {
        this.checkComplete();
        this.lgModal.hide();
        //this.router.navigate(['tfl-guide']);
    };
    __decorate([
        core_1.ViewChild('childModal'), 
        __metadata('design:type', ng2_bootstrap_1.ModalDirective)
    ], ModalSurveyComponent.prototype, "childModal", void 0);
    __decorate([
        core_1.ViewChild('lgModal'), 
        __metadata('design:type', ng2_bootstrap_1.ModalDirective)
    ], ModalSurveyComponent.prototype, "lgModal", void 0);
    ModalSurveyComponent = __decorate([
        core_1.Component({
            selector: 'modal-survey',
            templateUrl: 'Survey.component.html',
            exportAs: 'child6'
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, survey_service_1.SurveyService, router_1.Router])
    ], ModalSurveyComponent);
    return ModalSurveyComponent;
}());
exports.ModalSurveyComponent = ModalSurveyComponent;
//# sourceMappingURL=modalSurveyComponent.js.map