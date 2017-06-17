import { AuthService } from './../auth/auth.service';
import {Component, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {UserService} from "../user-service/user.service";
declare var jQuery: any;
declare var System: any;
@Component({
    selector: 'c-header',
    templateUrl: 'header.component.html'
})

export class HeaderComponent implements AfterViewInit {

    public isAdmin: boolean;
    public loggedIn;

    constructor(private userService: UserService, public authService: AuthService) {

        this.userService = userService;

        this.isAdmin = false;

        this.userService.loggedIn$.subscribe((res)=>{
            console.log('Logged In', res);

            this.loggedIn = res;

        })

        this.userService.user$.subscribe((user) => {

            //console.log('Was a user defined from the user service?', user);
            if (user && user.admin) {
                this.isAdmin = user.admin;
            }else{

                //console.log('THE USER WAS NOT DEFINED IN THE HEADER FUNCTION', user);
            }
        })

    }

    @ViewChild('hoversafe') el: ElementRef;

    ngAfterViewInit() {

        jQuery("a").on('click', function (evt) {

            if (jQuery('.navbar-collapse').hasClass('in')) {

                evt.stopPropagation();

                jQuery('.navbar-toggle').click();
            }


        });

        jQuery('.navbar-collapse').on('mouseleave', function (evt) {

            if (jQuery(this).hasClass('in')) {

                jQuery('.navbar-toggle').click();

            }

        });

        jQuery('.row.content').on('touchstart', function (evt) {
            if (jQuery('.navbar-collapse').hasClass('in')) {
                jQuery('.navbar-toggle').click();
            }

        });

    }

}
