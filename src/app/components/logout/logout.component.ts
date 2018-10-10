import { Component } from '@angular/core';
import {UserService} from "../user-service/user.service";
declare var jQuery:any;

@Component({
  selector: 'logout',
  templateUrl: "./logout.component.html"
})
export class LogoutComponent {

  constructor(private userService: UserService){
    jQuery('body').removeClass('adminMode');
    userService.logout();


  }
}
