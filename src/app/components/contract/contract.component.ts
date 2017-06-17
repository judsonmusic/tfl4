import {Component, AfterViewInit} from '@angular/core';
import {UserService} from "../user-service/user.service";

@Component({
  selector: 'logout',
  templateUrl: "./contract.component.html"
})
export class ContractComponent implements AfterViewInit{

  constructor(private userService: UserService){

    userService.logout();

  }

  ngAfterViewInit(){

    window.print();
  }
}
