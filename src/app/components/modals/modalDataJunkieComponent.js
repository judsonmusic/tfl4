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
var router_1 = require("@angular/router");
var ModalDataJunkieComponent = (function () {
    function ModalDataJunkieComponent(router, route) {
        this.router = router;
        this.route = route;
    }
    ModalDataJunkieComponent.prototype.show = function () {
        this.lgModal.show();
    };
    ModalDataJunkieComponent.prototype.hide = function () {
        //need to pass a flag to determine whether to hide this or not.
        if (this.router.url.indexOf('dashboard') > -1) {
            this.router.navigate(['/data-junkie']);
        }
        this.lgModal.hide();
    };
    ModalDataJunkieComponent.prototype.showChildModal = function () {
        this.childModal.show();
    };
    ModalDataJunkieComponent.prototype.hideChildModal = function () {
        this.childModal.hide();
    };
    ModalDataJunkieComponent.prototype.ngAfterViewInit = function () {
        //this.lgModal2.show();
    };
    __decorate([
        core_1.ViewChild('childModal'), 
        __metadata('design:type', ng2_bootstrap_1.ModalDirective)
    ], ModalDataJunkieComponent.prototype, "childModal", void 0);
    __decorate([
        core_1.ViewChild('lgModal'), 
        __metadata('design:type', ng2_bootstrap_1.ModalDirective)
    ], ModalDataJunkieComponent.prototype, "lgModal", void 0);
    ModalDataJunkieComponent = __decorate([
        core_1.Component({
            selector: 'modal-data-junkie',
            templateUrl: 'DataJunkie.component.html',
            exportAs: 'child4'
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute])
    ], ModalDataJunkieComponent);
    return ModalDataJunkieComponent;
}());
exports.ModalDataJunkieComponent = ModalDataJunkieComponent;
//# sourceMappingURL=modalDataJunkieComponent.js.map