import { SurveyService } from './survey.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'a-survey',
  templateUrl: 'survey.component.html',
  styleUrls: ['survey.component.css']
})
export class ASurveyComponent implements OnInit {
  public surveyQuestions;
  public surveyAnswers;
  public surveyData = [];

  constructor(public ss: SurveyService) { 
    this.surveyQuestions = ss.questions.filter((item)=>item.id < 100);
    this.surveyAnswers = ss.answers;
     //console.log('Hello Component!', this.surveyQuestions)
  }

  ngOnInit() {
    //console.log('Hello Component!')
    //here we need to get the survey data...
    this.ss.aggregate().subscribe(res=>{

        this.surveyData = res;

    })

  }

}
