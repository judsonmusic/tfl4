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
var ActionComponent = (function () {
    function ActionComponent(router, assessmentService, userService) {
        this.router = router;
        this.assessmentService = assessmentService;
        this.userService = userService;
        this.router = router;
        this.assessmentService = assessmentService;
        this.areas = this.assessmentService.questions;
        this.assessmentData = [];
        this.userService = userService;
    }
    ActionComponent.prototype.makeSubs = function () {
        var temp = [];
        this.assessmentService.questions.map(function (x) {
            temp.push(x.category);
        });
        this.categories = temp;
        //console.log('Categories: ', temp);
        var colors = [
            "#002494",
            "#bc0015",
            "#039f71",
            "#e5d500",
            "#eb6b00",
            "#3082e1"
        ];
        var temp2 = [];
        //loop through sub questions and then get each map data to what they chose for each area.
        this.assessmentService.subquestions.map(function (x, i) {
            console.log('Row:', i, x);
            var visible = i == 0;
            temp2.push({ name: x.category, data: [], visible: visible, color: x.color });
        });
        this.assessmentData.map(function (x, y) {
            //for each area on the series, we need to set what they selected from each area. 5 total. For example spiriitual.
            temp2.map(function (z, index) {
                //in each of the 5 things, get the values by index.
                //console.log('The index of data we are pushing to:', index);
                z.data.push(x.subs[index]);
            });
        });
        this.seriesdata = temp2;
        //console.log('Series Data: ', temp2);
    };
    ActionComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.userService.userData) {
            this.assessmentData = this.userService.userData.assessment || [];
            this.makeSubs();
        }
        else {
            this.userService.user$.subscribe(function (userData) {
                _this.assessmentData = userData.assessment || [];
                _this.makeSubs();
            });
        }
        // console.log('ACTION: ', this.assessmentData);
    };
    ActionComponent.prototype.goToDimension = function (id) {
        this.router.navigate(['/dimensions', id]);
    };
    ActionComponent = __decorate([
        core_1.Component({
            selector: 'action',
            templateUrl: '/app/components/action/action.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, assessment_service_1.AssessmentService, user_service_1.UserService])
    ], ActionComponent);
    return ActionComponent;
}());
exports.ActionComponent = ActionComponent;
//# sourceMappingURL=action.component.js.map