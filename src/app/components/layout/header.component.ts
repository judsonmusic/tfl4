import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
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

    constructor(private userService: UserService, public authService: AuthService, public route: ActivatedRoute, private router: Router) {

        this.userService = userService;

        this.isAdmin = false;

        this.userService.loggedIn$.subscribe((res)=>{  
            this.loggedIn = res;  
        })

        this.userService.user$.subscribe((user) => {
            if (user && user.admin) {
                this.isAdmin = user.admin;
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

    goToRoute(){
        //this was an attempt to maintain route params...
        //console.log(this.route.snapshot.children[0].params);
        if(this.route.snapshot.children[0].params['assessment_id']){
            this.router.navigate(['/dashboard/'+this.route.snapshot.children[0].params['user_id'] + "/" +this.route.snapshot.children[0].params['assessment_id']])

        }

    }

}
