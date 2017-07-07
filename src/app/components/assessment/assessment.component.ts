import { Component, OnInit, ViewChild, Renderer } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from "../user-service/user.service";
import { AuthService } from "../auth/auth.service";
import { AssessmentService } from "../assessment/assessment.service";
import { ModalDirective } from 'ngx-bootstrap';
declare var System: any;
@Component({
  templateUrl: 'assessment.component.html',
})
export class AssessmentComponent implements OnInit {


  @ViewChild('g') public g: ModalDirective;

  public data: any;
  public count = 0;
  public answers: any;
  public questions: any;
  public subquestions: any;
  public user: any[];
  public Math: any;
  public assessmentComplete: boolean;

  ngOnInit() {
    //console.log(this.userService.userData, this.data.account);
    this.data.account = this.userService.userData || this.data.account;
    //console.log('@@@@@SURVEY INIT!', this.data.account);
    this.userService.user$.subscribe((userData) => {
      this.data.account = userData;
      console.log('ACCOUNT INFORMATION ADDED!', this.data.account);
      this.checkComplete();

    });

    this.checkComplete();


  }

  constructor(private router: Router, public userService: UserService, public authService: AuthService, public assessmentService: AssessmentService, private renderer: Renderer) {


    this.authService.redirectUrl = '/assessment';

    this.Math = Math;


    //console.log('the assessment componet loaded.');
    //array of answers they can select for main question.

    this.data = {};
    this.data.account = {};
    this.data.account.assessment = this.assessmentService.assessment;
    this.questions = this.assessmentService.questions;
    this.subquestions = this.assessmentService.subquestions;
    this.answers = this.assessmentService.answers;
    this.assessmentComplete = false;

  }

  start() {

    this.count = 1;
  }
  save() {

    //console.log('Saving Your Data!');
    //we need to add the assessment data to the account so it will get stored in use data;
    this.userService.updateAccount(this.data.account).subscribe((res) => {
      //console.log('Data saved. Going to next slide.');
      this.counterUp();

    }, (err) => console.log('There was an error!'));

  }
  //she (terrie) wants to use the data from the satisfied option from the assessment for this..
  updateSubs(ev, value, assessmentIndex) {
    console.log('THIS IS A TEST: ' , ev,value,assessmentIndex,assessmentIndex.subs)
    //ev.stopPropagation()
    //we are using the 2nd value in the array to store satisfaction.
    assessmentIndex.subs = [null, (value * 20), null, null, null, null];

  }

  counterUp() {

    this.assessmentComplete = false;

    if (this.count < this.questions.length) {

      this.count++;

    } else {

      this.count = 1;
    }

  }//end counter

  counterDown() {

    this.assessmentComplete = false;

    if (this.count > 1 && this.count <= this.questions.length) {

      this.count--;

    } else {

      this.count = 1;
    }

  }//end counter

  finish(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    this.assessmentComplete = true;
    this.userService.updateAccount(this.data.account).subscribe((res) => {

      this.g.onShow.subscribe((hidden) => {
        //console.log('The modal us showig!');
      });


      this.g.show();

      this.g.onHide.subscribe((hidden) => {
        //console.log('The modal us hidden!');
        //this.save();      
        this.router.navigate(['dashboard']);
      });



    }, (err) => console.log('There was an error!'));



  }

  checkComplete() {

    console.log('Check completetion!');
    let tempComplete = [];
    this.data.account.assessment.map((item) => {

      if (item.answer != "") {
        tempComplete.push(true);

      } else {

        tempComplete.push(false);
      }

    });

    if (tempComplete.indexOf(false) > -1) {

      this.assessmentComplete = false;

    } else {

      this.assessmentComplete = true;
    }

    console.log(tempComplete);
  }

  doSomething(){

    console.log('Clicked!');
  }


}
