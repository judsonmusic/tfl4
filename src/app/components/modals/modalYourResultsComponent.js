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
var ng2_bootstrap_1 = require('ngx-bootstrap');
var ModalYourResultsComponent = (function () {
    function ModalYourResultsComponent() {
    }
    ModalYourResultsComponent.prototype.show = function () {
        this.lgModal.show();
    };
    ModalYourResultsComponent.prototype.showChildModal = function () {
        this.childModal.show();
    };
    ModalYourResultsComponent.prototype.hideChildModal = function () {
        this.childModal.hide();
    };
    ModalYourResultsComponent.prototype.ngAfterViewInit = function () {
        //this.lgModal2.show();
    };
    __decorate([
        core_1.ViewChild('childModal'), 
        __metadata('design:type', ng2_bootstrap_1.ModalDirective)
    ], ModalYourResultsComponent.prototype, "childModal", void 0);
    __decorate([
        core_1.ViewChild('lgModal'), 
        __metadata('design:type', ng2_bootstrap_1.ModalDirective)
    ], ModalYourResultsComponent.prototype, "lgModal", void 0);
    ModalYourResultsComponent = __decorate([
        core_1.Component({
            selector: 'modal-results',
            templateUrl: 'YourResults.component.html',
            exportAs: 'child3'
        }), 
        __metadata('design:paramtypes', [])
    ], ModalYourResultsComponent);
    return ModalYourResultsComponent;
}());
exports.ModalYourResultsComponent = ModalYourResultsComponent;
//# sourceMappingURL=modalYourResultsComponent.js.map