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
var dimension_service_1 = require("../dimension-service/dimension.service");
var DimensionsComponent = (function () {
    function DimensionsComponent(route, userService, assessmentService, router, dimensionService) {
        this.route = route;
        this.userService = userService;
        this.assessmentService = assessmentService;
        this.router = router;
        this.dimensionService = dimensionService;
        this.sessionStorage = sessionStorage;
        this.answerData = [];
        this.subquestions = this.assessmentService.subquestions;
        this.data = {};
        this.data.account = {};
        this.answerConfirmed = false;
        this.categories = [];
        this.router = router;
        this.score = 0;
        this.answerData.subs = [];
        this.answerData.stressLevel;
    }
    DimensionsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.data.account = this.userService.userData || this.data.account;
        if (typeof this.data.account.dimensions === "undefined") {
            this.data.account.dimensions = this.dimensionService.dimensions;
        }
        //console.log('@@@@@SURVEY INIT!', this.data.account);
        this.userService.user$.subscribe(function (userData) {
            _this.data.account = userData;
            //console.log('ACCOUNT INFORMATION ADDED!', this.data.account);
        });
        this.answers = this.assessmentService.answers;
        //passing route param...
        this.sub = this.route.params.subscribe(function (params) {
            //console.log('Dimension Comp', this.userService.userData);
            var id = +_this.dimensionid || +params['id']; // (+) converts string 'id' to a number
            _this.dimension = _this.assessmentService.getDimension(id);
            _this.userService.user$.subscribe(function (user) {
                _this.assessmentData = user.assessment;
                _this.buildData();
            });
            if (_this.userService.userData) {
                _this.assessmentData = _this.userService.userData.assessment || [];
                _this.buildData();
            }
        });
    };
    DimensionsComponent.prototype.buildData = function () {
        //console.log('Building data.');
        var _this = this;
        this.answerData = this.assessmentService.getAnswerForQuestion(this.assessmentData, this.dimension.id)[0] || [];
        this.answerData.subs.map(function (o) {
            _this.score += o;
        });
        this.score = this.answerData.subs[1];
        //this.score = Math.round( this.score * 1) / 1;
        this.answerConfirmed = (this.answerData.subs.length == this.subquestions.length) && this.answerData.subs.indexOf(null) == -1;
        this.seriesdata = this.assessmentService.getSubsForDimension(this.assessmentData, this.dimension.id)[0].subs || [];
        //console.log('THE SERIES DATA 1', this.seriesdata);
        //console.log('THE DIMENSION IS: ' , this.dimension.category);
        this.categories.push({ id: this.dimension.id, category: this.dimension.category });
        var temp2 = [];
        //loop through sub questions and then get each map data to what they chose for each area.
        this.assessmentService.subquestions.map(function (x, i) {
            //console.log('Row:', i, x);
            var visible = i == 0;
            temp2.push({ name: x.category, data: [_this.assessmentData[_this.dimension.id - 1].subs[i]], visible: true, color: x.color });
        });
        this.seriesdata = temp2;
        //console.log('$$$$$$$The series data is: ', this.seriesdata);
    };
    DimensionsComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    DimensionsComponent.prototype.save = function () {
        var _this = this;
        //console.log('Saving Your Data!', this.data.account);
        //we need to add the assessment data to the account so it will get stored in use data;
        this.userService.updateAccount(this.data.account).subscribe(function (res) {
            //console.log('The result of the update is: ', this.data.account.assessment);
            _this.buildData();
            _this.answerConfirmed = true;
            var dataCheckPassed = [];
            //check if step 1 is complete.
            var duplicateObject = JSON.parse(JSON.stringify(_this.assessmentData));
            duplicateObject.forEach(function (x) {
                if (x.subs.length == 0) {
                    x.subs = [null, null, null, null, null, null];
                } //fix to ensure subs is pre-populated. 0 means no selection.
                console.log(x.answer, x.subs);
                //if they have left an answer blank or a sub is not answered, datacheck has not passed.
                if (x.answer <= 3 && x.subs.indexOf(null) > -1) {
                    //data check did not pass we need to update step as such...
                    console.log('Data Check Failed...');
                    dataCheckPassed.push(false);
                }
                else if (x.answer <= 3 && x.subs.indexOf(null) === -1) {
                    console.log('Data Check Passed...');
                    dataCheckPassed.push(true);
                }
                console.log(dataCheckPassed);
            });
            //if all the data passed for step 1, update the database as such..
            if (dataCheckPassed.indexOf(false) === -1) {
                _this.data.account.steps[1] = true;
                _this.userService.updateAccount(_this.data.account).subscribe(function (res) {
                    sessionStorage.setItem('steps', _this.data.account.steps);
                });
            }
        }, function (err) { return console.log('There was an error!'); });
    };
    DimensionsComponent.prototype.checkScroll = function () {
        var self = this;
        setTimeout(function () {
            //if (self.answerData.subs.length == self.subquestions.length) {
            $('body').animate({ scrollTop: $('body').scrollTop() + 50 });
            //}
        }, 1);
    };
    DimensionsComponent.prototype.goToDashboard = function () {
        this.router.navigate(['/dashboard']);
    };
    DimensionsComponent.prototype.checkReveal = function () {
        if ((this.answerData.subs.length == this.subquestions.length && this.answerData.subs.indexOf(null) < 0) || (this.answerData.subs.length > 0 && this.answerData.subs.indexOf(null) < 0)) {
            return true;
        }
    };
    DimensionsComponent.prototype.goToDimension = function (id) {
        this.router.navigate(['/dimensions', id]);
    };
    DimensionsComponent.prototype.goToStress = function () {
        this.router.navigate(['/stress']);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DimensionsComponent.prototype, "dimensionid", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DimensionsComponent.prototype, "datamode", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DimensionsComponent.prototype, "guidemode", void 0);
    DimensionsComponent = __decorate([
        core_1.Component({
            selector: 'c-dimension',
            templateUrl: '/app/components/dimensions/dimensions.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, user_service_1.UserService, assessment_service_1.AssessmentService, router_1.Router, dimension_service_1.DimensionService])
    ], DimensionsComponent);
    return DimensionsComponent;
}());
exports.DimensionsComponent = DimensionsComponent;
//# sourceMappingURL=dimensions.component.js.map