import { TextMaskModule } from 'angular2-text-mask';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from "./../user-service/user.service";
import {AuthService} from "./../auth/auth.service";


@Component({
  selector: 'user-component',
  templateUrl: "./user.component.html",

})
export class UserComponent {

  user: any;
  loggedIn: any;
  public mask: any;
  public maskPhone: any;
  public occupations: any[];
  public education: any[];
  public hear: any[];
  public message: string;

  constructor(private userService: UserService, public authService: AuthService, public router: Router) {

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

    this.occupations =[

      {id: 1, value: 'Student'},
      {id: 2, value: 'CEO of my household'},
      {id: 3, value: 'Business owner'},
      {id: 4, value: 'C-suite'},
      {id: 5, value: 'Manager'},
      {id: 6, value: 'Administrative'},
      {id: 7, value: 'Operations'},
      {id: 8, value: 'Account manager'},
      {id: 9, value: 'Sales'},
      {id: 10, value: 'Skilled labor'},
      {id: 11, value: 'IT specialist'},
      {id: 12, value: 'Consultant'},
      {id: 13, value: 'Teacher'},
      {id: 14, value: 'Law enforcement'},
      {id: 15, value: 'Fireman'},
      {id: 16, value: 'Counselor or coach'},
      {id: 17, value: 'Medical professional'},
      {id: 18, value: 'Lawyer'},
      {id: 19, value: 'Athlete'},
      {id: 20, value: 'Performer'},
      {id: 21, value: 'Artist'},
      {id: 22, value: 'Retiree'},
      {id: 23, value: 'Hospitality'},
      {id: 24, value: 'Service position'},
      {id: 25, value: 'Other'}

    ];

    this.education = [

      {id: 1, value: 'High school'},
      {id: 2, value: 'Certified in a specific skill'},
      {id: 3, value: 'Undergraduate'},
      {id: 4, value: 'Masters or graduate degree'},
      {id: 5, value: 'Doctorate or Ph.D.'},
      {id: 6, value: 'Other'}

    ];

    this.hear = [

      {id: 1, value: 'Company'},
      {id: 2, value: 'Retreat or workshop'},
      {id: 3, value: 'Online'},
      {id: 4, value: 'Friend or family'},
      {id: 5, value: 'Coach'},
      {id: 6, value: 'School'},
      {id: 7, value: 'Amazon'}

    ];

    this.mask = [/[0-9]/, /\d/, '/', /\d/, /\d/,'/', /\d/, /\d/, /\d/, /\d/];
    this.maskPhone = ['(', /[0-9]/, /\d/, /\d/, ')' , ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

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

  addAccount(user) {

    this.userService.createAccount(user).subscribe((result) => {
      console.log('The result from creating account: ', result);
      if (!result.account) {

        this.message = result.message;

      }else{

        console.log('Account Created Succesfully!', result.account);
        var payload = {
          email: result.account.email,
          password: user.password
        }
        this.userService.login(payload).subscribe((res) => {
          console.log('You are now logged in as well...', res);
          this.authService.login();
          console.log(this.authService.isLoggedIn);
          // Get the redirect URL from our auth service
          // If no redirect has been set, use the default
          let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/assessment';
          // Redirect the user
          this.router.navigate([redirect]);
        });


      }
    });
  }

  updateAccount(user) {

    this.userService.updateAccount(user).subscribe((result) => {
      if (result) {
        //console.log('Account Updated Succesfully!', result);

      }
    });
  }


}
