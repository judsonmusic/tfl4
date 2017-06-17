import { Injectable }             from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot }    from '@angular/router';
import { AuthService }            from './auth.service';
import {UserService} from "../user-service/user.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private userService: UserService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {


    if (!this.authService.isLoggedIn){

      //console.log('Auth Guard subscribing to get user.');

      this.userService.getUser().subscribe((user) => {

        //console.log('AUTH GUARD GETTING USER', user);

        if (user && user._id) {
          this.authService.isLoggedIn = true;
          // Store the attempted URL for redirectin
          //console.log('Trying to go to ', state.url);
          this.authService.redirectUrl = state.url || '/dashboard';
          this.router.navigate([this.authService.redirectUrl]);
          return true;

        }else{
          console.log('Validation Failed.');
          sessionStorage.clear();
          this.router.navigate(['/login']);
          return false;
        }


      }, (error) => {
        console.log('There was an error.');
        this.router.navigate(['/login']);
        return false

      });





    }else {

      //console.log('AUTH GUARD SAYS THEY ARE ALREADY LOGGED IN!');
      this.authService.redirectUrl = state.url;
      //console.log(state.url);
      //this.router.navigate([this.authService.redirectUrl]);
      return true;



    }


  }
}
