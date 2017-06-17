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
var ModalGenericComponent = (function () {
    function ModalGenericComponent() {
        this.onShow = new core_1.EventEmitter();
        this.onShown = new core_1.EventEmitter();
        this.onHide = new core_1.EventEmitter();
        this.onHidden = new core_1.EventEmitter();
        //console.log('Modal DataJunkie Loaded');
        this.message = this.message || "No message was provided!";
    }
    ModalGenericComponent.prototype.show = function () {
        this.lgModal.show();
        this.onShow.next(true);
    };
    ModalGenericComponent.prototype.hide = function () {
        this.lgModal.hide();
        this.onHide.next(true);
    };
    __decorate([
        core_1.ViewChild('lgModal'), 
        __metadata('design:type', ng2_bootstrap_1.ModalDirective)
    ], ModalGenericComponent.prototype, "lgModal", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ModalGenericComponent.prototype, "message", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ModalGenericComponent.prototype, "onShow", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ModalGenericComponent.prototype, "onShown", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ModalGenericComponent.prototype, "onHide", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ModalGenericComponent.prototype, "onHidden", void 0);
    ModalGenericComponent = __decorate([
        core_1.Component({
            selector: 'modal-generic',
            templateUrl: 'Generic.component.html',
            exportAs: 'child10'
        }), 
        __metadata('design:paramtypes', [])
    ], ModalGenericComponent);
    return ModalGenericComponent;
}());
exports.ModalGenericComponent = ModalGenericComponent;
//# sourceMappingURL=modalGenericComponent.js.map