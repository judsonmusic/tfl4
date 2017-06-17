import { Component } from '@angular/core';
import {UserService} from "../user-service/user.service";

@Component({
  selector: 'logout',
  templateUrl: "./logout.component.html"
})
export class LogoutComponent {

  constructor(private userService: UserService){

    userService.logout();

  }
}
