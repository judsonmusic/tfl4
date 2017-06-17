import { Component, ViewContainerRef, OnInit } from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {Location} from '@angular/common';
import {HeaderComponent} from "./components/layout/header.component";
import {UserService} from "./components/user-service/user.service";
import {AuthService} from "./components/auth/auth.service";
declare var System:any;
declare var jQuery:any;


@Component({
  selector: 'my-app',
  templateUrl: 'app.component.html'
  //directives: [HeaderComponent]
})
export class AppComponent implements OnInit{

  public viewContainerRef;
  public userService;
  public authService;
  public router;
  public location;

  public constructor(viewContainerRef:ViewContainerRef, userService: UserService, authService: AuthService, router: Router, location:Location) {

    this.viewContainerRef = viewContainerRef;
    this.userService = userService;
    this.authService = authService;
    this.router = router;
    this.location = location;

    jQuery(document).on('click', '.panel-heading span.clickable', function(e){

        var jQuerythis = jQuery(this);
        jQuerythis.parents('.panel').find('.panel-body').css({minHeight: '0'});
        jQuerythis.parents('.panel').find('.panel-body').slideToggle();
        jQuerythis.find('i').toggleClass('glyphicon-chevron-up glyphicon-chevron-down');
       /* if(!jQuerythis.hasClass('panel-is-collapsed')) {

            var minHeight = jQuerythis.parents('.panel').find('.panel-body').css('minHeight');
            jQuerythis.parents('.panel').find('.panel-body').css({minHeight: '0'});
            jQuerythis.parents('.panel').find('.panel-body').slideUp();
            jQuerythis.addClass('panel-is-collapsed');
            jQuerythis.find('i').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
        } else {
            console.log('it is collapsed, we need to open it!');
            jQuerythis.parents('.panel').find('.panel-body').removeClass('panel-collapsed').animate({height: 'auto'});
            jQuerythis.parents('.panel').find('.panel-body').slideDown();
            jQuerythis.parents('.panel').find('.panel-body').css({minHeight: minHeight});
            jQuerythis.removeClass('panel-is-collapsed');
            //jQuerythis.parents('.panel').find('.panel-body').removeClass();
            jQuerythis.find('i').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
        }*/
    })

  }

  ngOnInit() {

    this.router.events.subscribe((val) => {
      // see also
      window.scrollTo(0,0);
    });

    this.userService.getUser().subscribe((user) =>{
      console.log('APP FOUND USER WHILE CALLING GET USER', user);
      //this.authService.isLoggedIn = true;
      //let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/dashboard';
      // Redirect the user
      //console.log('The location is: ', this.location.path());
      if(this.location.path() == '/' || this.location.path() == '') {

        this.router.navigate(['/dashboard']);
      }

    }, (error) => {
      console.log('Error! Redirecting!');
      let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/';
      // Redirect the user
      this.router.navigate(['/']);


    });

  }
}
