import { SurveyService } from './../a-survey/survey.service';
import { HeaderComponent } from './../layout/header.component';
import { UserService } from './../user-service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AssessmentService } from './../assessment/assessment.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin-view-user',
  templateUrl: './admin-view-user.component.html',
  styleUrls: ['./admin-view-user.component.css']
})
export class AdminViewUserComponent implements OnInit {
  public user;
  public assessmentData;
  public assessmentComplete: boolean = false;
  constructor(public as: AssessmentService, public us: UserService, public ss: SurveyService, public route: ActivatedRoute, public router: Router) {

  }

  ngOnInit() {

    if (typeof this.route.snapshot.params["user_id"] != 'undefined') {
      var id = this.route.snapshot.params["user_id"];

      this.us.getUserById(id).subscribe(res => {

        this.user = res;

        //console.log('USER DATA:', this.user);

        this.as.getByUserId(id).subscribe(res2 => {
          this.assessmentData = res2;
          //console.log('ASSESSMENT DATA:', this.assessmentData);

        })
      })


    }


  }

  checkComplete(a) {


    var temp = [];


    a.assessment.map((obj) => {

      temp.push(obj.answer != "");

    });

    //console.log('First 15 questions: ', temp, temp.indexOf(false) > -1);

    return temp.indexOf(false) > -1;

    //this.allUnlocked = temp.indexOf(false) === -1;
    //this.assessmentData.steps[6] = this.allUnlocked;


  }


  loadAssessment(assessmentData) {
    //console.log(assessmentData);
    this.router.navigate(['/dashboard/' + this.user._id + "/" + assessmentData._id]);
  }

  getDimension(id) {

    return this.as.questions.filter(
      (item: any) => item.id === id)[0];

  }

  getMotivated(assessmentData, item) {
    let motivated;
    var subs = assessmentData.assessment.filter(res => res.id == item.id)[0].subs;
    if (subs[1] && !!subs[5]) {
      return "Yes!";
    }else{
      return "Not Answered";
    }   
  }


  //TODO: refactor to use as indy functions for assessments loop
  mapAssessmentQuestion(item) {
    let question;
    if (item.id) {
      question = (this.as.questions.filter((res: any) => res.id === item.id)[0].question);
    } else {
      question = '???'
    }
    return question;

  }

  mapAssessmentAnswer(item) {

    let answer;

    if (item.answer) {
      answer = (this.as.answers.filter((res: any) => res.id === item.answer)[0].value);
    } else {
      answer = '???'
    }

    return answer;
  }

  mapSurveyQuestion(item) {

    let question;

    //if its less than 100, set the answer value to the answer given.
    //if (item.id < 100) {

    question = (this.ss.questions.filter((res: any) => res.id === item.id)[0].question);
    //}   

    return question;
  }//end map surveyQuestion

  mapSurveyAnswer(item) {
    //loop through the survey..
    let answer;
    if (item.answer !== "") {
      if (item.id < 100) {
        answer = (this.ss.answers.filter((res: any) => res.id === item.answer)[0].value);
      } else {
        answer = item.answer;
      }
    } else {
      answer = "Not Provided";
    }
    return answer;

  }//end map surveyAnswer


}
