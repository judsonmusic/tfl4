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
var auth_service_1 = require("../auth/auth.service");
var http_1 = require('@angular/http');
var user_service_1 = require("../user-service/user.service");
var LoginComponent = (function () {
    function LoginComponent(authService, router, http, userService) {
        this.authService = authService;
        this.router = router;
        this.http = http;
        this.userService = userService;
        this.setMessage();
        this.loginData = { email: "", password: "" };
    }
    LoginComponent.prototype.setMessage = function () {
        //this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
    };
    LoginComponent.prototype.login = function (user) {
        var _this = this;
        this.userService.login(user).subscribe(function (user) {
            if (user['success'] == true) {
                _this.authService.login();
                console.log(_this.authService.isLoggedIn);
                // Get the redirect URL from our auth service
                // If no redirect has been set, use the default
                var redirect = _this.authService.redirectUrl ? _this.authService.redirectUrl : '/dashboard';
                // Redirect the user
                _this.router.navigate([redirect]);
            }
            else {
                _this.message = 'Login Failed :( Please try again.';
            }
        });
    };
    LoginComponent.prototype.logout = function () {
        this.authService.logout();
        this.setMessage();
    };
    LoginComponent.prototype.forgotPassword = function () {
        alert('coming soon!');
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login-component',
            templateUrl: '/app/components/login/login.component.html'
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, router_1.Router, http_1.Http, user_service_1.UserService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map