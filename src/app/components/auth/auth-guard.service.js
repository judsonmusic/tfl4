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
var auth_service_1 = require('./auth.service');
var user_service_1 = require("../user-service/user.service");
var AuthGuard = (function () {
    function AuthGuard(authService, router, userService) {
        this.authService = authService;
        this.router = router;
        this.userService = userService;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        var _this = this;
        if (!this.authService.isLoggedIn) {
            //console.log('Auth Guard subscribing to get user.');
            this.userService.getUser().subscribe(function (user) {
                //console.log('AUTH GUARD GETTING USER', user);
                if (user && user._id) {
                    _this.authService.isLoggedIn = true;
                    // Store the attempted URL for redirectin
                    //console.log('Trying to go to ', state.url);
                    _this.authService.redirectUrl = state.url || '/dashboard';
                    //this.router.navigate([this.authService.redirectUrl]);
                    return true;
                }
                else {
                    console.log('Validation Failed.');
                    sessionStorage.clear();
                    _this.router.navigate(['/login']);
                    return false;
                }
            }, function (error) {
                console.log('There was an error.');
                _this.router.navigate(['/login']);
                return false;
            });
        }
        else {
            //console.log('AUTH GUARD SAYS THEY ARE ALREADY LOGGED IN!');
            this.authService.redirectUrl = state.url;
            //console.log(state.url);
            //this.router.navigate([this.authService.redirectUrl]);
            return true;
        }
    };
    AuthGuard = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, router_1.Router, user_service_1.UserService])
    ], AuthGuard);
    return AuthGuard;
}());
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth-guard.service.js.map