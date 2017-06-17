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
var assessment_service_1 = require("../assessment/assessment.service");
var WhenCreateView = (function () {
    function WhenCreateView(el, assessmentService) {
        this.el = el;
        this.assessmentService = assessmentService;
        this.el = el;
        this.assessmentService = assessmentService;
    }
    WhenCreateView.prototype.ngOnInit = function () {
        var _this = this;
        //console.log('The data mode is: ' , this.datamode);
        this.assessmentService.getHtmlForDimension(this.whencreateview).subscribe(function (html) {
            _this.el.nativeElement.innerHTML = html;
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], WhenCreateView.prototype, "whencreateview", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], WhenCreateView.prototype, "datamode", void 0);
    WhenCreateView = __decorate([
        core_1.Directive({
            selector: '[whencreateview]'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, assessment_service_1.AssessmentService])
    ], WhenCreateView);
    return WhenCreateView;
}());
exports.WhenCreateView = WhenCreateView;
//# sourceMappingURL=oncreateview.js.map