import { ModalGenericComponent } from './../modals/modalGenericComponent';
import { UtilitiesService } from './../../utilities/utilities.component';
import { DimensionService } from './../dimension-service/dimension.service';
import { Component, OnInit, ViewChild, Renderer } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from "../user-service/user.service";
import { AuthService } from "../auth/auth.service";
import { AssessmentService } from "../assessment/assessment.service";
import { ModalDirective } from 'ngx-bootstrap';
import { SurveyService } from '../a-survey/survey.service';
declare var System: any;
@Component({
  templateUrl: 'assessment.component.html',
})
export class AssessmentComponent implements OnInit {


  @ViewChild('g') public g: ModalDirective;
  @ViewChild('g2') public g2: ModalDirective;

  public data: any;
  public count = 0;
  public answers: any;
  public questions: any;
  public subquestions: any;
  public user: any[];
  public Math: any;
  public assessmentComplete: boolean;
  public assessmentData: any;
  public userData: any;
  public dataLoaded: boolean = false;
  public assessments: Array<any> = [];
  public startAssessment: boolean = false;
  public newAssessment: boolean = false;



  constructor(private router: Router, public userService: UserService, public authService: AuthService, public assessmentService: AssessmentService, private renderer: Renderer, public ss: SurveyService, public ds: DimensionService, public utils: UtilitiesService) {

    sessionStorage.removeItem('steps');
    sessionStorage.removeItem('surveyReminderShown');
    this.authService.redirectUrl = '/assessment';

    this.Math = Math;


    //console.log('the assessment componet loaded.');
    //array of answers they can select for main question.

    /* this.data = {};
    this.data.account = {};
    this.data.account.assessment = this.assessmentService.assessment; */
    //this.userData = {};
    this.questions = this.assessmentService.questions;
    this.subquestions = this.assessmentService.subquestions;
    this.answers = this.assessmentService.answers;
    this.assessmentComplete = false;

  }

  ngOnInit() {
    //this.utils.showLoading();
      //console.log('The session storage on assessment load: ' , sessionStorage);
     if (sessionStorage.getItem('jwt')) {
      //console.log('User is logged in. Lets check for any previous assessments...');
      //we added this to make sure we have data on page reload!
      this.userService.getUser().subscribe((user) => {
        //console.log('user data retrieved...', user);
        this.userData = user;

        this.assessmentService.getByUserId(this.userData._id).subscribe(res => {
          console.log('Did we find an existing assessment?', res);
          if(!res || res.length == 0){
            console.log('No assessment found, lets begin one!')

            //this.initNewAssessment();    
            this.newAssessment = true;
             
          }else{

            this.utils.hideLoading();
            this.assessments = res;
            this.assessmentData = res[0];
            //this.checkComplete();
            this.dataLoaded = true;

          }
          
        });
      });
    }else{
      //no session info do nothing?
      this.dataLoaded = true;

    }

  }

  takeNewAssessment(){

    this.newAssessment = true;
    
  }

  addNewAssessment(){

    let assessmentData = {
      dimensions: this.ds.dimensions,
      survey: this.ss.survey,
      assessment: this.assessmentService.assessment,
      otherElements: [],
      user_id: this.userData._id

    };

    this.assessmentService.createAssessment(assessmentData).subscribe(res=>{
        this.assessmentData = res.assessment;
        this.utils.hideLoading();
        this.dataLoaded = true;
        this.startAssessment = true;
    });
  }

  initNewAssessment(){

    let assessmentData = {
      dimensions: this.ds.dimensions,
      survey: this.ss.survey,
      assessment: this.assessmentService.assessment,
      otherElements: [],
      user_id: this.userData._id

    };


    this.assessmentService.createAssessment(assessmentData).subscribe(res=>{

        this.assessmentData = res.assessment;
        this.utils.hideLoading();
        this.dataLoaded = true;
        this.startAssessment = true;
        this.count = 1;
    });
  }

  start() {
    this.initNewAssessment();
    //this.count = 1;
  }
  save() {

    this.assessmentService.updateAssessment(this.assessmentData).subscribe(res=>{

      this.counterUp();

    })


  }
  //she (terrie) wants to use the data from the satisfied option from the assessment for this..
  updateSubs(ev, value, assessmentIndex) {
    //console.log('THIS IS A TEST: ' , ev,value,assessmentIndex,assessmentIndex.subs)
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

    this.g2.show();

    this.g2.onHide.subscribe((data) => {

      //console.log(data);

      this.assessmentComplete = false;

      if (this.count > 1 && this.count <= this.questions.length) {

        this.count--;

      } else {

        this.count = 1;
      }    
      
    });



    

  }//end counter

  finish(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    this.assessmentComplete = true;
    this.assessmentService.updateAssessment(this.assessmentData).subscribe((res) => {

      this.g.onShow.subscribe((hidden) => {
        //console.log('The modal us showig!');
      });


      this.g.show();

      this.g.onHide.subscribe((hidden) => {
        //console.log('The modal us hidden!');
        //this.save();      
        this.router.navigate(['/dashboard/' + this.assessmentData._id]);
      });



    }, (err) => console.log('There was an error!'));



  }

  checkComplete(assessmentData) {

    //console.log('Check completetion!');
    let tempComplete = [];
    assessmentData.assessment.map((item) => {

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
      //if the assessment is complete....
      //this.router.navigate(['/dashboard']) //removed because of the new ability to retake the assessment.
    }
    

    //console.log(tempComplete);
  }

  doSomething() {

    //console.log('Clicked!');
  }

  checkIfAssessmentComplete(a){


    var temp = [];
 

    a.assessment.map((obj) => {
     
        temp.push(obj.answer != "");

    });

    //console.log('First 15 questions: ', temp, temp.indexOf(false) > -1);

    return temp.indexOf(false) > -1;

    //this.allUnlocked = temp.indexOf(false) === -1;
    //this.assessmentData.steps[6] = this.allUnlocked;


}

  loadAssessment(assessmentData){
    //console.log(assessmentData);
    //before we can navigate we need to check to see if the need to do the inital steps...
    this.checkComplete(assessmentData)
    this.assessmentData = assessmentData;
    if(!this.assessmentComplete) {
      this.startAssessment = true;
    }else{
      this.router.navigate(['/dashboard/' + assessmentData.user_id + "/" + assessmentData._id]);
    }
    console.log('Is the assessment complete?', this.assessmentComplete);
    //
  }


}
