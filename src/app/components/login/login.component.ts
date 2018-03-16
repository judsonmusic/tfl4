import { Component }   from '@angular/core';
import { Router }      from '@angular/router';
import { AuthService } from "../auth/auth.service";
import { Http } from '@angular/http';
import { UserService } from "../user-service/user.service";
declare var System:any;
@Component({

  selector:'login-component',
  templateUrl: 'login.html'
})

export class LoginComponent {

  message: string;
  loginData:any;
  public loggedIn;

  constructor(public authService: AuthService, public router: Router, public http: Http, public userService: UserService) {
    this.setMessage();
    this.loginData = {email: "", password: ""};
  }
  setMessage() {
    //this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }

  login(user) {
    this.userService.login(user).subscribe(user => {
      if(user['success'] == true) {
        this.authService.login();
        console.log(this.authService.isLoggedIn);
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/dashboard';
        // Redirect the user
        this.router.navigate([redirect]);
      }else{

        this.message = 'Login Failed :( Please try again.';
      }

    });
  }

  logout() {
    this.authService.logout();
    this.setMessage();
  }

  forgotPassword(){

    this.router.navigate(['/forgot-password']);

    //alert('coming soon!');
  }
}
