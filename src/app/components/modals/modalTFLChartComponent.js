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
var ModalTFLChartComponent = (function () {
    function ModalTFLChartComponent() {
        //console.log('Modal TFL Chart Loaded');
    }
    ModalTFLChartComponent.prototype.show = function () {
        this.lgModal.show();
    };
    ModalTFLChartComponent.prototype.hide = function () {
        this.lgModal.hide();
        sessionStorage.setItem('modal-tfl-chart', "1");
    };
    ModalTFLChartComponent.prototype.showChildModal = function () {
        this.childModal.show();
    };
    ModalTFLChartComponent.prototype.hideChildModal = function () {
        this.childModal.hide();
        sessionStorage.setItem('modal-tfl-chart', "1");
    };
    ModalTFLChartComponent.prototype.ngAfterViewInit = function () {
        //if(!sessionStorage.getItem('modal-tfl-chart')) {
        //this.lgModal.show();
        //}
    };
    __decorate([
        core_1.ViewChild('childModal'), 
        __metadata('design:type', ng2_bootstrap_1.ModalDirective)
    ], ModalTFLChartComponent.prototype, "childModal", void 0);
    __decorate([
        core_1.ViewChild('lgModal'), 
        __metadata('design:type', ng2_bootstrap_1.ModalDirective)
    ], ModalTFLChartComponent.prototype, "lgModal", void 0);
    ModalTFLChartComponent = __decorate([
        core_1.Component({
            selector: 'modal-tfl-chart',
            templateUrl: 'TFLChart.component.html',
            exportAs: 'child6'
        }), 
        __metadata('design:paramtypes', [])
    ], ModalTFLChartComponent);
    return ModalTFLChartComponent;
}());
exports.ModalTFLChartComponent = ModalTFLChartComponent;
//# sourceMappingURL=modalTFLChartComponent.js.map