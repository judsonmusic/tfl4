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
var AssessmentService = (function () {
    function AssessmentService(http) {
        this.http = http;
        this.http = http;
        this.questions = [
            { id: 1, question: "I feel my diet is healthy and that I am fueling my body for optimal performance. ", category: "Nutrition", templatePath: "/app/components/dimensions/nutrition.html" },
            { id: 2, question: "I get adequate sleep and regularly take part in activities which help me recharge and destress.", category: "Relax", templatePath: "/app/components/dimensions/relax.html" },
            { id: 3, question: "I get enough exercise and movement throughout the day for optimal health.", category: "Activity", templatePath: "/app/components/dimensions/activity.html" },
            { id: 4, question: "I have a sense of self-worth, a positive attitude and I am free of current and/or past self-doubt and struggles.", category: "Emotional", templatePath: "/app/components/dimensions/emotional.html" },
            { id: 5, question: "I feel a connection to a higher source and have a sense of comfort knowing that I am part of something greater than myself.", category: "Spiritual", templatePath: "/app/components/dimensions/spiritual.html" },
            { id: 6, question: "I am free of unhealthy behavior that impacts my overall Ideal Being.", category: "Habits", templatePath: "/app/components/dimensions/habits.html" },
            { id: 7, question: "I have a supportive social network and feel my relationships are healthy and fulfilling.", category: "Relationships", templatePath: "/app/components/dimensions/relationships.html" },
            { id: 8, question: "I routinely go to my doctor(s), follow medical recommendations and practice self-care.", category: "Health", templatePath: "/app/components/dimensions/health.html" },
            { id: 9, question: "I am satisfied with my economic position.", category: "Financial", templatePath: "/app/components/dimensions/financial.html" },
            { id: 10, question: "I engage in fun activities, hobbies and laugh often.", category: "Play", templatePath: "/app/components/dimensions/play.html" },
            { id: 11, question: "I feel a sense of fulfillment with the way I spend my time.", category: "Life Balance", templatePath: "/app/components/dimensions/life-balance.html" },
            { id: 12, question: "I feel a sense of peace and contentment in my home.", category: "Home", templatePath: "/app/components/dimensions/home.html" },
            { id: 13, question: "I feel that I am challenged and growing as a person.", category: "Intellect", templatePath: "/app/components/dimensions/intellectual.html" },
            { id: 14, question: "I am content with what I see when I look in the mirror.", category: "Self-Image", templatePath: "/app/components/dimensions/self-image.html" },
            { id: 15, question: "I feel engaged at work and valued by my employer.", category: "Purpose", templatePath: "/app/components/dimensions/purpose.html" }
        ];
        /*
    
         .swatch.swatch-blue {
         background: #04319e;
         }
    
         .swatch.swatch-light-blue {
         background: #3082e1;
         }
    
         .swatch.swatch-black {
    
         background: #333338;
         }
    
         .swatch.swatch-green {
    
         background: #089b6f;
         }
    
         .swatch.swatch-orange {
    
         background: #fe7d00;
         }
    
         .swatch.swatch-purple {
    
         background: #4600bd;
    
         }
    
         .swatch.swatch-yellow {
    
         background: #e5e300;
    
         }
    
         .swatch.swatch-red {
    
         background: #d10016;
    
         }
    
    
    
    
         */
        this.subquestions = [
            { id: "1", category: "Importance", question: "This dimension of my life is important to me.", color: "#04319e" },
            //we pulled this out because the answer should really be prefilled by the answer on the first questions.
            { id: "2", category: "Satisfaction", question: "I am satisfied with this dimension of my life.", color: "#d10016" },
            { id: "3", category: "Performance", question: "This dimension impacts my work performance.", color: "#089b6f" },
            { id: "4", category: "Happiness", question: "This dimension impacts my happiness.", color: "#e5e300" },
            { id: "5", category: "Action", question: "I am actively working to improve and/or maintain this dimension of my life.", color: "#fe7d00" },
            { id: "6", category: "Motivation", question: "I am motivated to improve and/or maintain this dimension of my life.", color: "#3082e1" } //this answer needs to be < 4
        ];
        this.answers = [
            { id: 1, value: "Strongly Disagree" },
            { id: 2, value: "Disagree" },
            { id: 3, value: "Neutral" },
            { id: 4, value: "Agree" },
            { id: 5, value: "Strongly Agree" }
        ];
        this.assessment = [
            { id: 1, answer: "", subs: [] },
            { id: 2, answer: "", subs: [] },
            { id: 3, answer: "", subs: [] },
            { id: 4, answer: "", subs: [] },
            { id: 5, answer: "", subs: [] },
            { id: 6, answer: "", subs: [] },
            { id: 7, answer: "", subs: [] },
            { id: 8, answer: "", subs: [] },
            { id: 9, answer: "", subs: [] },
            { id: 10, answer: "", subs: [] },
            { id: 11, answer: "", subs: [] },
            { id: 12, answer: "", subs: [] },
            { id: 13, answer: "", subs: [] },
            { id: 14, answer: "", subs: [] },
            { id: 15, answer: "", subs: [] }
        ];
    }
    AssessmentService.prototype.getDimension = function (id) {
        return this.questions.filter(function (item) { return item.id === id; })[0];
    };
    AssessmentService.prototype.getSubsForDimension = function (assessment, id) {
        //console.log('ASSESSMENT FOR FILTER', id, assessment);
        return assessment.filter(function (item) { return item.id == id; });
    };
    AssessmentService.prototype.getAnswerForQuestion = function (assessment, id) {
        return assessment.filter(function (item) { return item.id == id; });
    };
    AssessmentService.prototype.getHtmlForDimension = function (templatePath) {
        return this.http.get(templatePath).map(function (response) {
            return response['_body'];
        });
    };
    AssessmentService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AssessmentService);
    return AssessmentService;
}());
exports.AssessmentService = AssessmentService;
//# sourceMappingURL=assessment.service.js.map