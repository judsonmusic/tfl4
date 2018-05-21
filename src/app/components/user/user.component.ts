import { UtilitiesService } from './../../utilities/utilities.component';
import { TextMaskModule } from 'angular2-text-mask';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from "./../user-service/user.service";
import { AuthService } from "./../auth/auth.service";


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
  public ethnicities: any[];
  public incomes: any[];
  public education: any[];
  public hear: any[];
  public message: string;

  constructor(private userService: UserService, public authService: AuthService, public router: Router, public utils_service: UtilitiesService) {

    this.user = {

      firstName: "",
      lastName: "",
      email: "",
      password: "",
      occupation: "",
      education: "",
      income: "",
      ethnicity: "",
      phone: "",
      hear: ""

    };

    this.ethnicities = [

      { id: 1, value: 'Caucasian' },
      { id: 2, value: 'Black or African American' },
      { id: 3, value: 'Hispanic' },
      { id: 4, value: 'Native American' },
      { id: 5, value: 'Asian' },
      { id: 6, value: 'Middle Eastern' },      
      { id: 99, value: 'Other' }

    ];

    this.incomes = [

      { id: 1, value: '< 25k' },
      { id: 2, value: '25-50k' },
      { id: 3, value: '51-75k' },
      { id: 4, value: '75-100k' },
      { id: 5, value: '101-150k' },
      { id: 6, value: '151-250k' },
      { id: 7, value: '> 250k' }    

    ];

    this.education = [

      { id: 1, value: 'High school freshman' },
      { id: 2, value: 'High school sophomore' },
      { id: 3, value: 'High school junior' },
      { id: 4, value: 'High school senior' },
      { id: 5, value: 'High school diploma/GED' },
      { id: 6, value: 'College freshman' },
      { id: 7, value: 'College sophomore' },
      { id: 8, value: 'College junior' },
      { id: 9, value: 'College senior' },
      { id: 10, value: 'Certified in a specific skill' },
      { id: 11, value: 'Undergraduate' },
      { id: 12, value: 'Masters or graduate degree' },
      { id: 13, value: 'Doctorate or Ph.D.' },
      { id: 99, value: 'Other' }

    ];

    this.occupations = [

      { id: 1, value: 'Student' },
      { id: 2, value: 'CEO of my household' },
      { id: 3, value: 'Business owner' },
      { id: 4, value: 'C-suite executive' },
      { id: 5, value: 'Manager' },
      { id: 6, value: 'Administrative' },
      { id: 7, value: 'Operations' },
      { id: 8, value: 'Account manager' },
      { id: 9, value: 'Sales' },
      { id: 10, value: 'Skilled labor' },
      { id: 11, value: 'IT specialist' },
      { id: 12, value: 'Consultant' },
      { id: 13, value: 'Education' },
      { id: 14, value: 'Law enforcement' },
      { id: 15, value: 'Fireman' },
      { id: 16, value: 'Counselor or coach' },
      { id: 17, value: 'Healthcare professional' },
      { id: 18, value: 'Lawyer/paralegal' },
      { id: 19, value: 'Athlete' },
      //{ id: 20, value: 'Performer' },
      { id: 21, value: 'Artist' },
      { id: 22, value: 'Retiree' },
      { id: 23, value: 'Hospitality' },
      { id: 24, value: 'Service position' },
      { id: 25, value: 'Active duty military' },
      { id: 26, value: 'Veteran' },
      { id: 27, value: 'Finance' },
      { id: 28, value: 'Customer service' },
      { id: 29, value: 'Retail' },
      { id: 30, value: 'Public service ' },
      { id: 31, value: 'Marketing' },
      { id: 32, value: 'Engineer' },
      { id: 33, value: 'Fitness professional' },
      { id: 34, value: 'Unemployed' },
      { id: 99, value: 'Other' }

    ];

    this.education = [

      { id: 1, value: 'High school freshman' },
      { id: 2, value: 'High school sophomore' },
      { id: 3, value: 'High school junior' },
      { id: 4, value: 'High school senior' },
      { id: 5, value: 'High school diploma/GED' },
      { id: 6, value: 'College freshman' },
      { id: 7, value: 'College sophomore' },
      { id: 8, value: 'College junior' },
      { id: 9, value: 'College senior' },
      { id: 10, value: 'Certified in a specific skill' },
      { id: 11, value: 'Undergraduate' },
      { id: 12, value: 'Masters or graduate degree' },
      { id: 13, value: 'Doctorate or Ph.D.' },
      { id: 99, value: 'Other' }

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

  addAccount(user) {

    this.userService.createAccount(user).subscribe((result) => {
      //console.log('The result from creating account: ', result);
      if (!result.account) {

        this.message = result.message;

      } else {

        //console.log('Account Created Succesfully!', result.account);
        var payload = {
          email: result.account.email,
          password: user.password
        }
        this.userService.login(payload).subscribe((res) => {
          //console.log('You are now logged in as well...', res);
          this.authService.login();
          //console.log(this.authService.isLoggedIn);
          // Get the redirect URL from our auth service
          // If no redirect has been set, use the default
          let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/assessment';
          // Redirect the user
          //console.log('Redirecting to...', redirect);  
          this.utils_service.showLoading();
          window.parent.location.href='/assessment';        
          //this.router.navigate([redirect]);
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
