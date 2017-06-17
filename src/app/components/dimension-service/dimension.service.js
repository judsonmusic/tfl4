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
var DimensionService = (function () {
    function DimensionService() {
        this.dimensions = [
            { id: 1, barriers: [], tools: [], stressLevel: 0 },
            { id: 2, barriers: [], tools: [], stressLevel: 0 },
            { id: 3, barriers: [], tools: [], stressLevel: 0 },
            { id: 4, barriers: [], tools: [], stressLevel: 0 },
            { id: 5, barriers: [], tools: [], stressLevel: 0 },
            { id: 6, barriers: [], tools: [], stressLevel: 0 },
            { id: 7, barriers: [], tools: [], stressLevel: 0 },
            { id: 8, barriers: [], tools: [], stressLevel: 0 },
            { id: 9, barriers: [], tools: [], stressLevel: 0 },
            { id: 10, barriers: [], tools: [], stressLevel: 0 },
            { id: 11, barriers: [], tools: [], stressLevel: 0 },
            { id: 12, barriers: [], tools: [], stressLevel: 0 },
            { id: 13, barriers: [], tools: [], stressLevel: 0 },
            { id: 14, barriers: [], tools: [], stressLevel: 0 },
            { id: 15, barriers: [], tools: [], stressLevel: 0 },
        ];
    }
    DimensionService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DimensionService);
    return DimensionService;
}());
exports.DimensionService = DimensionService;
//# sourceMappingURL=dimension.service.js.map