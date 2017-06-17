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
/*
 * Changes the case of the first letter of a given number of words in a string.
 */
var TitleCasePipe = (function () {
    function TitleCasePipe() {
    }
    TitleCasePipe.prototype.transform = function (input, length) {
        return input.length > 0 ? input.replace(/\w\S*/g, (function (txt) { return txt[0].toUpperCase() + txt.substr(1).toLowerCase(); })) : '';
    };
    TitleCasePipe = __decorate([
        core_1.Pipe({ name: 'titleCase', pure: false }), 
        __metadata('design:paramtypes', [])
    ], TitleCasePipe);
    return TitleCasePipe;
}());
exports.TitleCasePipe = TitleCasePipe;
//# sourceMappingURL=titlecase.pipe.js.map