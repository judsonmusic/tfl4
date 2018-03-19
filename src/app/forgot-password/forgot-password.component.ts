import { UserService } from './../components/user-service/user.service';
import { ActivatedRoute } from '@angular/router';
import { UtilitiesService } from './../utilities/utilities.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  
  public vmessages;
  public formValid;
  public registerData;
  public changePasswordMode: boolean = false;
  public message;
  public messageClass;
  public isValid: boolean = false;
  public routeParams;


  constructor(public route: ActivatedRoute, public utils_service: UtilitiesService, public as: UserService) {

    this.registerData = {
    };
    this.vmessages = { email: '' };

    this.route.params.subscribe(params => {

      this.checkParams(params);

    })

  

   

  }

  checkParams(params){
    
     if (params 
      && params.hasOwnProperty('email') 
      && params['email'] != ":email" 
      && params.hasOwnProperty('code')) {

      console.log(':::Change password mode!');
      this.changePasswordMode = true;
      this.registerData.email = params['email'];
      this.formValid = true;

    } else {

      console.log(':::Change password INSTRUCTIONS mode!');
      this.changePasswordMode = false;
      this.formValid = true;

    }
      
  }

  ngOnInit(){

      //console.log(this.utils_service.loaderVisible);
  }


  validate() {

    let valid = true;
    let message = "";

    if (!this.registerData.email || this.registerData.email == "") {

      message += "You must enter a valid email address.<br>";
    }

    if (!this.registerData.password || this.registerData.password == "") {

      message += "You must enter a valid password.<br>";
    }

    if (!this.registerData.password2 || this.registerData.password2 == "") {

      message += "You must confirm your password.<br>";
    }

    if (this.registerData.password != this.registerData.password2) {

      message += "Your passwords do not match.";
      valid = false;

    }

    if (!valid) {

      this.message = message;
    }

    return valid;

  };

  validateEmail(ev, value) {
    let val = this.registerData.email;
    this.vmessages.email = '';
    this.utils_service.validateEmail(val).subscribe((message) => {
    
      if (!message) {

        this.vmessages.email = "This email did not exist in our database";


      } else if (message == "Email Invalid" || !message) {

        this.vmessages.email = message;

      } else {

        this.sendPassword();

      }
    })
  }

  sendPassword() {
    this.utils_service.showLoading();
    this.as.sendPassword(this.registerData.email).subscribe(res => {     
      alert('Success! Password instructions have been sent to your email address. Please click ok to be redirected to the home page.');
      window.location.href = "";
      this.utils_service.hideLoading();

    })
  }

  changePassword() {
    this.utils_service.showLoading();
    if (this.validate()) {

      this.as.changePassword(this.registerData).subscribe(res => {
        
        alert('Success : Your password was successfully changed, please click ok to be redirected to the home page and login with your new password.');
        window.location.href = "";
        this.utils_service.hideLoading();

      })
    }
  }
}
