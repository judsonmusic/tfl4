import { Injectable } from '@angular/core';
import { UtilitiesService } from './../../utilities/utilities.component';
import { Router }      from '@angular/router';
import { Http, Headers } from '@angular/http';
import { AuthService } from "../auth/auth.service";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";

@Injectable()
export class CompaniesService {

  constructor(public http: Http, public us: UtilitiesService) { }

  getCompanies(){

    let headers = new Headers();
    //headers.append('Content-Type', 'application/json');

    headers.append('x-access-token', sessionStorage['jwt']);
    //console.log('We have a user ID! Lets try to get a user!');
    return this.http
        .get(this.us.apiUrl() + '/api/companies', {headers : headers} )
        .map(res => res.json())
        .map((res) => {

          return res;


        }, (error) => console.log('There was an error', error));

}

}
