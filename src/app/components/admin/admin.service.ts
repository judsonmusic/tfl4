import { SurveyService } from './../a-survey/survey.service';
import { UtilitiesService } from './../../utilities/utilities.component';
import { Injectable } from '@angular/core';
import { Router }      from '@angular/router';
import { Http, Headers } from '@angular/http';
import {AuthService} from "../auth/auth.service";
import {AssessmentService} from "../assessment/assessment.service";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";


@Injectable()
export class AdminService{

  userData:any;
  user = new Subject<boolean>();
  user$:Observable<any>;
  loggedIn = new Subject<boolean>();
  loggedIn$:Observable<any>;


  constructor(private http:Http, public authService:AuthService, public router:Router, public assessmentService: AssessmentService, public surveyService: SurveyService, public us: UtilitiesService) {

    this.user = new Subject<boolean>();
    this.user$ = this.user.asObservable();
    this.loggedIn = new Subject<boolean>();
    this.loggedIn$ = this.loggedIn.asObservable();

  }

  getUser(){

      let headers = new Headers();
      //headers.append('Content-Type', 'application/json');

      headers.append('x-access-token', sessionStorage['jwt']);
      //console.log('We have a user ID! Lets try to get a user!');
      return this.http
        .get(this.us.apiUrl() + '/api/accounts/' + sessionStorage['_id'], {headers : headers} )
        .map(res => res.json())
        .map((res) => {

          if(!res){
            //console.log('***THERE WAS AN ERROR!');
            this.authService.isLoggedIn = false;

          }else {
            //console.log('USER FOUND!', res);
            this.authService.isLoggedIn = true;
            this.loggedIn.next(true);
            //this.userData = res;
            //this.user.next(res);
            //this.surveyService.checkComplete(this.userData);
            return res;
          }
        }, (error) => console.log('There was an error', error));

  }

    getUsers(){

        let headers = new Headers();
        //headers.append('Content-Type', 'application/json');

        headers.append('x-access-token', sessionStorage['jwt']);
        //console.log('We have a user ID! Lets try to get a user!');
        return this.http
            .get(this.us.apiUrl() + '/api/accounts', {headers : headers} )
            .map(res => res.json())
            .map((res) => {

              return res;


            }, (error) => console.log('There was an error', error));

    }

    deleteUser(payload){     

      let headers = new Headers();
      //headers.append('Content-Type', 'application/json');

      headers.append('x-access-token', sessionStorage['jwt']);
      //console.log('We have a user ID! Lets try to get a user!');
      return this.http
          .put(this.us.apiUrl() + '/api/accounts/delete', payload, {headers : headers} )
          .map(res => res.json())
          .map((res) => {

            return res;


          }, (error) => console.log('There was an error', error));


   
  }





}
