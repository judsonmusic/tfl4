import { UtilitiesService } from './utilities/utilities.component';
import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { HeaderComponent } from "./components/layout/header.component";
import { UserService } from "./components/user-service/user.service";
import { AuthService } from "./components/auth/auth.service";
declare var System: any;
declare var jQuery: any;


@Component({
  selector: 'my-app',
  templateUrl: 'app.component.html'
  //directives: [HeaderComponent]
})
export class AppComponent implements OnInit {

  public viewContainerRef;
  public userService;
  public authService;
  public us;
  public router;
  public location;
  public renderView;

  public constructor(viewContainerRef: ViewContainerRef, userService: UserService, authService: AuthService, router: Router, location: Location, us: UtilitiesService) {

    this.viewContainerRef = viewContainerRef;
    this.userService = userService;
    this.authService = authService;
    this.us = us;
    this.router = router;
    this.location = location;
    this.renderView = false;

    jQuery(document).on('click touchstart', '.panel-heading span.clickable', function (e) {

      var jQuerythis = jQuery(this);
      jQuerythis.parents('.panel').find('.panel-body').css({ minHeight: '0' });
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

  ngAfterViewInit(){

   

  }

  ngOnInit() {
  this.us.hideLoading();
   console.log(this.us.loaderVisible);
    this.router.events.subscribe((val) => {
      // see also
      window.scrollTo(0, 0);
    });
   if (this.location.path() != '/' && this.location.path() != '') {
    this.userService.getUser().subscribe((user) => { 
      

      if (!user) {
        if (this.location.path() != '/' && this.location.path() != '') {
          //this.router.navigate(['/']);
        }

      } else {
        this.authService.isLoggedIn = true;
        if (this.location.path() == '/' || this.location.path() == '') {
          //this.router.navigate(['/dashboard']);
        }
      }
      this.renderView = true;


    }, (error) => {
      console.log('Error! Redirecting!');
      //let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/';
      // Redirect the user
      //this.router.navigate(['/']);


    });
   }

  }
}
