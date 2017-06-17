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
var ModalTFLGuideComponent = (function () {
    function ModalTFLGuideComponent() {
        //console.log('Modal TFL Guide Loaded');
    }
    ModalTFLGuideComponent.prototype.show = function () {
        this.lgModal.show();
    };
    ModalTFLGuideComponent.prototype.showChildModal = function () {
        this.childModal.show();
    };
    ModalTFLGuideComponent.prototype.hideChildModal = function () {
        this.childModal.hide();
    };
    ModalTFLGuideComponent.prototype.ngAfterViewInit = function () {
        //if(!sessionStorage.getItem('modal-tfl-guide')) {
        this.lgModal.show();
        //}
    };
    __decorate([
        core_1.ViewChild('childModal'), 
        __metadata('design:type', ng2_bootstrap_1.ModalDirective)
    ], ModalTFLGuideComponent.prototype, "childModal", void 0);
    __decorate([
        core_1.ViewChild('lgModal'), 
        __metadata('design:type', ng2_bootstrap_1.ModalDirective)
    ], ModalTFLGuideComponent.prototype, "lgModal", void 0);
    ModalTFLGuideComponent = __decorate([
        core_1.Component({
            selector: 'modal-tfl-guide',
            templateUrl: 'TFLGuide.component.html',
            exportAs: 'child5'
        }), 
        __metadata('design:paramtypes', [])
    ], ModalTFLGuideComponent);
    return ModalTFLGuideComponent;
}());
exports.ModalTFLGuideComponent = ModalTFLGuideComponent;
//# sourceMappingURL=modalTFLGuideComponent.js.map