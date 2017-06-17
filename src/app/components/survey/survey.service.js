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
var http_1 = require('@angular/http');
var SurveyService = (function () {
    function SurveyService(http) {
        this.http = http;
        this.http = http;
        this.questions = [
            { id: 1, question: "I am glad I took the TFL Assessment and feel it was a valuable exercise. " },
            { id: 2, question: "The TFL Assessment reflects my life accurately." },
            { id: 3, question: "I am going to take action in some of the dimensions I explored through this assessment." },
            { id: 4, question: "I would value “one” TFL Coaching session to design a TFL Action Plan based on the dimensions that interest me." },
            { id: 5, question: "I would be interested in ongoing TFL Coaching and believe it would help me in certain dimensions of my life." },
            { id: 6, question: "I would recommend the TFL assessment to others." },
            { id: 7, question: "The TFL Action Plan information shared under each dimension was helpful." },
            { id: 8, question: "I would be interested in additional TFL services, assessments, workshops and programs." },
            { id: 9, question: "I found the TFL assessment and site content thorough, helpful and encouraging." },
            { id: 10, question: "I found the TFL assessment and site content easy to understand and navigate. " },
            { id: 11, question: "I liked the TFL reporting and charts and it was easy to understand." },
            { id: 12, question: "I would like to learn how I can better manage stress." },
            { id: 13, question: "I would like to receive mindfulness training." },
            /*{id: 100, question: "I think the assessment is worth:"},*/
            { id: 101, question: "Additional Feedback" }
        ];
        this.answers = [
            { id: 1, value: "Strongly Disagree" },
            { id: 2, value: "Disagree" },
            { id: 3, value: "Neutral" },
            { id: 4, value: "Agree" },
            { id: 5, value: "Strongly Agree" }
        ];
        this.survey = [
            { id: 1, answer: "" },
            { id: 2, answer: "" },
            { id: 3, answer: "" },
            { id: 4, answer: "" },
            { id: 5, answer: "" },
            { id: 6, answer: "" },
            { id: 7, answer: "" },
            { id: 8, answer: "" },
            { id: 9, answer: "" },
            { id: 10, answer: "" },
            { id: 11, answer: "" },
            { id: 12, answer: "" },
            /*{id: 100, answer: ""},*/
            { id: 101, answer: "" }
        ];
    }
    SurveyService.prototype.checkComplete = function (userData) {
        var complete = [];
        if (userData.survey.length > 0) {
            userData.survey.map(function (item) {
                if (item.id == 101 || item.id == 100 || item.answer != "") {
                    complete.push(true);
                }
                else {
                    complete.push(false);
                }
            });
            this.surveyComplete = complete.indexOf(false) == -1;
        }
        else {
            this.surveyComplete = false;
        }
    };
    SurveyService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], SurveyService);
    return SurveyService;
}());
exports.SurveyService = SurveyService;
//# sourceMappingURL=survey.service.js.map