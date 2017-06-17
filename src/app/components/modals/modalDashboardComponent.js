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
var ModalDashboardComponent = (function () {
    function ModalDashboardComponent() {
        //console.log('Modal Demo Loaded');
    }
    ModalDashboardComponent.prototype.show = function () {
        //console.log('Show modal!');
        this.lgModal.show();
    };
    ModalDashboardComponent.prototype.hide = function () {
        //console.log('Hide modal!');
        sessionStorage.setItem('modal-demo', '1');
        this.lgModal.hide();
    };
    ModalDashboardComponent.prototype.showChildModal = function () {
        //this.childModal.show();
    };
    ModalDashboardComponent.prototype.hideChildModal = function () {
        //this.childModal.hide();
    };
    ModalDashboardComponent.prototype.ngAfterViewInit = function () {
        if (!sessionStorage.getItem('modal-demo')) {
        }
    };
    __decorate([
        core_1.ViewChild('childModal'), 
        __metadata('design:type', ng2_bootstrap_1.ModalDirective)
    ], ModalDashboardComponent.prototype, "childModal", void 0);
    __decorate([
        core_1.ViewChild('lgModal'), 
        __metadata('design:type', ng2_bootstrap_1.ModalDirective)
    ], ModalDashboardComponent.prototype, "lgModal", void 0);
    ModalDashboardComponent = __decorate([
        core_1.Component({
            selector: 'modal-dashboard',
            templateUrl: 'Dashboard.component.html',
            exportAs: 'child'
        }), 
        __metadata('design:paramtypes', [])
    ], ModalDashboardComponent);
    return ModalDashboardComponent;
}());
exports.ModalDashboardComponent = ModalDashboardComponent;
//# sourceMappingURL=modalDashboardComponent.js.map