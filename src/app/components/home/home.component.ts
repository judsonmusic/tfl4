import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from "../user-service/user.service";
declare var System:any;
@Component({
  selector: 'home-component',
  templateUrl: 'home.component.html'
})
export class HomeComponent {


  constructor(public router: Router, public userService: UserService){


  }

  getStarted(){

    this.router.navigate(['/assessment']);

  }

  getUser() {

    this.userService.getUser().subscribe();

  }
}
