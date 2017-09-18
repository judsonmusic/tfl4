import { AssessmentService } from './../assessment/assessment.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'a-assessment',
  templateUrl: './a-assessment.component.html',
  styleUrls: ['./a-assessment.component.css']
})
export class AAssessmentComponent implements OnInit {

  public questions;
  public answers;
  public subquestions;
  public assessmentData;

  constructor(public as: AssessmentService) { 

    this.questions = this.as.questions;
    this.answers = this.as.answers;
    this.subquestions = this.as.subquestions;
    this.assessmentData = [];
  }

  ngOnInit() {
  }

}