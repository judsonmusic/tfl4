import { UtilitiesService } from './../../utilities/utilities.component';
import { Injectable } from '@angular/core';
import { Router }      from '@angular/router';
import { Http, Headers } from '@angular/http';
import {AuthService} from "../auth/auth.service";
import {AssessmentService} from "../assessment/assessment.service";
import {SurveyService} from "../a-survey/survey.service";
import {DimensionService} from "../dimension-service/dimension.service";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";


@Injectable()
export class UserService{

  userData:any;
  user= new Subject<boolean>();
  user$:Observable<any>;
  loggedIn = new Subject<boolean>();
  loggedIn$:Observable<any>;


  constructor(private http:Http, public authService:AuthService, public router:Router, public assessmentService: AssessmentService, public surveyService: SurveyService, public dimensionService: DimensionService, public us: UtilitiesService) {

    this.user = new Subject<boolean>();
    this.user$ = this.user.asObservable();
    this.loggedIn = new Subject<boolean>();
    this.loggedIn$ = this.loggedIn.asObservable();

  }

  getUser(){

    //console.log('USER SERVICE: get user...');

      let headers = new Headers();
      //headers.append('Content-Type', 'application/json');

      headers.append('x-access-token', sessionStorage.getItem('jwt'));
      //console.log('We have a user ID! Lets try to get a user!');
      return this.http
        .get(this.us.apiUrl() + '/api/accounts/' + sessionStorage.getItem('_id'), {headers : headers} )
        .map(res => res.json())
        .map((res) => {

          if(!res){
            //console.log('***THERE WAS AN ERROR!');
            sessionStorage.clear();
            this.authService.isLoggedIn = false;
            this.loggedIn.next(false);
            this.userData = null;

          }else {
            //console.log('USER SERVICE: user was found.');
            this.authService.isLoggedIn = true;            
            this.loggedIn.next(true);
            this.userData = res;
            //this.user.next(res);
            //TODO: move this to assessment service.
            /* if(typeof this.userData.dimensions.length === "undefined" || this.userData.dimensions.length < 15){
              this.userData.dimensions = this.dimensionService.dimensions;
            } */
            //this.surveyService.checkComplete(this.userData);
            //this.user.next(res);
            return res;
          }
        }, (error) => console.log('There was an error', error));

  }

  createAccount(user) {
    //user.assessment = this.assessmentService.assessment;
    //user.survey = this.surveyService.survey;
    //user.dimensions = this.dimensionService.dimensions;
    //console.log('Build empty assessment: ' , user.assessment);
    //console.log('Attempting to create an account with', user);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
        .post(
            this.us.apiUrl() + '/api/accounts',
            user,
            {headers}
        )
        .map(res => res.json())
        .map((res) => {
          if (res['account']) {
            console.log('Account created!', res["account"]);
            //this.authService.isLoggedIn = true;
            //this.loggedIn.next(true);
            //this.userData = res["account"];
            //this.user$ = this.userData;
            //this.user.next(this.userData);
            return res;
          }else{

            this.authService.isLoggedIn = false;
            return res;

          }
        });
  }


  login(user) {

    console.log('Loggin you in...');
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
      .post(
        this.us.apiUrl() + '/api/authenticate',
        user,
        {headers}
      )
      .map(res => res.json())
      .map((res) => {


          if(res['success'] == true) {
            sessionStorage.setItem('jwt', res.token);
            sessionStorage.setItem('_id', res.user[0]._id);
            //set user service info...
            this.loggedIn.next(true);
            //this.userData = res.user[0];
            //this.surveyService.checkComplete(this.userData);
            /* if(typeof this.userData.dimensions.length === "undefined" || this.userData.dimensions.length < 15){

              this.userData.dimensions = this.dimensionService.dimensions;
            } */
            //this.user.next(res.user[0]);

            return res;


          }else{

            return res;

        }
      });
  }


  logout() {
    sessionStorage.clear();
    sessionStorage.clear();
    this.userData = null;
    this.authService.isLoggedIn = false;
    this.loggedIn.next(false);
  }

  updateAccount(user) {
    //console.log('Updating Account', user);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('x-access-token', sessionStorage.getItem('jwt'));

    return this.http
      .put(
        this.us.apiUrl() + '/api/accounts/' + user._id,
        user,
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
      //console.log('**********', res['account']);
        if(typeof res["account"] !== "undefined") {
          //this.userData = res["account"];
          //this.user.next(res['account']);
          return res['account'];
        }else{

          //return this.userData;
        }

      });
  }


  sendPassword(email){

    return this.http.post(this.us.apiUrl() +  "/api/forgot-password/" + email + "/" + Math.random(), email)
    .map(res => res.json())
    .map(res => {      
      return res;
    })
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));    

  }

  changePassword(payload){
    
        return this.http.post(this.us.apiUrl() +  "/api/change-password", payload)
        .map(res => res.json())
        .map(res => {   
          console.log('Hello');   
          return res;
        })
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));    
    
      }

}
