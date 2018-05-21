import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from "rxjs/Rx";

@Component({
  selector: 'app-utilities',
  templateUrl: './utilities.component.html',
  styleUrls: ['./utilities.component.css']
})
export class UtilitiesService implements OnInit {

  public loaderVisible: boolean = false;

  constructor(public http: Http) {

    this.loaderVisible = true;
    
   }

  ngOnInit() {
  }
  apiUrl() {

    if (location.hostname.indexOf('localhost') > -1) {

      return '//localhost:3333';

    } else {

      return '//www.trainforlifeamerica.com';
    }

  }

  validateEmail(email) {
    let message = null;
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //console.log('Email validation check: ', re.test(email));
    if (!re.test(email)) {
      message = "Email Invalid";
      return Observable.of(message).map(message => { return message });

    } else {

      return this.http.post(this.apiUrl() + '/api/validate/email', { email: email })
        .map(res => res.json())
        .map(res => {
          //console.log('Here is the result from validation email address: ' , res);
          if (res) {
            message = "Email already registered."
          }
          return message;

        })
    }

  }

  showLoading(){

    if(!this.loaderVisible) this.loaderVisible = true;

  }

  hideLoading(){

    if(this.loaderVisible) this.loaderVisible = false;

  }

}
