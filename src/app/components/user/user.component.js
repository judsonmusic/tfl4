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
var user_service_1 = require("./../user-service/user.service");
var auth_service_1 = require("./../auth/auth.service");
var UserComponent = (function () {
    function UserComponent(userService, authService, router) {
        this.userService = userService;
        this.authService = authService;
        this.router = router;
        this.user = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            occupation: "",
            education: "",
            phone: "",
            hear: ""
        };
        this.occupations = [
            { id: 1, value: 'Student' },
            { id: 2, value: 'CEO of my household' },
            { id: 3, value: 'Business owner' },
            { id: 4, value: 'C-suite' },
            { id: 5, value: 'Manager' },
            { id: 6, value: 'Administrative' },
            { id: 7, value: 'Operations' },
            { id: 8, value: 'Account manager' },
            { id: 9, value: 'Sales' },
            { id: 10, value: 'Skilled labor' },
            { id: 11, value: 'IT specialist' },
            { id: 12, value: 'Consultant' },
            { id: 13, value: 'Teacher' },
            { id: 14, value: 'Law enforcement' },
            { id: 15, value: 'Fireman' },
            { id: 16, value: 'Counselor or coach' },
            { id: 17, value: 'Medical professional' },
            { id: 18, value: 'Lawyer' },
            { id: 19, value: 'Athlete' },
            { id: 20, value: 'Performer' },
            { id: 21, value: 'Artist' },
            { id: 22, value: 'Retiree' },
            { id: 23, value: 'Hospitality' },
            { id: 24, value: 'Service position' },
            { id: 25, value: 'Other' }
        ];
        this.education = [
            { id: 1, value: 'High school' },
            { id: 2, value: 'Certified in a specific skill' },
            { id: 3, value: 'Undergraduate' },
            { id: 4, value: 'Masters or graduate degree' },
            { id: 5, value: 'Doctorate or Ph.D.' },
            { id: 6, value: 'Other' }
        ];
        this.hear = [
            { id: 1, value: 'Company' },
            { id: 2, value: 'Retreat or workshop' },
            { id: 3, value: 'Online' },
            { id: 4, value: 'Friend or family' },
            { id: 5, value: 'Coach' },
            { id: 6, value: 'School' },
            { id: 7, value: 'Amazon' }
        ];
        this.mask = [/[0-9]/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
        this.maskPhone = ['(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
        // this.userService.user$.subscribe((userData) => {
        //   this.user = userData;
        //   //console.log('We got some data!');
        // });
        //
        // this.userService.loggedIn$.subscribe((loggedIn) => {
        //   this.loggedIn = loggedIn;
        //   //console.log('The user is logged in!');
        // });
    }
    UserComponent.prototype.addAccount = function (user) {
        var _this = this;
        this.userService.createAccount(user).subscribe(function (result) {
            //console.log('The result from creating account: ', result);
            if (!result.account) {
                _this.message = result.message;
            }
            else {
                //console.log('Account Created Succesfully!', result.account);
                _this.userService.login(result.account).subscribe(function (result) {
                    //console.log('You are now logged in as well...', result);
                    _this.authService.login();
                    console.log(_this.authService.isLoggedIn);
                    // Get the redirect URL from our auth service
                    // If no redirect has been set, use the default
                    var redirect = _this.authService.redirectUrl ? _this.authService.redirectUrl : '/assessment';
                    // Redirect the user
                    _this.router.navigate([redirect]);
                });
            }
        });
    };
    UserComponent.prototype.updateAccount = function (user) {
        this.userService.updateAccount(user).subscribe(function (result) {
            if (result) {
            }
        });
    };
    UserComponent = __decorate([
        core_1.Component({
            selector: 'user-component',
            templateUrl: "/app/components/user/user.component.html",
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, auth_service_1.AuthService, router_1.Router])
    ], UserComponent);
    return UserComponent;
}());
exports.UserComponent = UserComponent;
//# sourceMappingURL=user.component.js.map