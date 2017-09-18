import { AssessmentService } from './../assessment/assessment.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'a-dimensions',
  templateUrl: './a-dimensions.component.html',
  styleUrls: ['./a-dimensions.component.css']
})
export class ADimensionsComponent implements OnInit {

  public questions;
  public answers;
  public subquestions;
  public dimensionData;

  constructor(public as: AssessmentService) { 

    this.questions = this.as.questions;
    this.answers = this.as.answers;
    this.subquestions = this.as.subquestions;
    this.dimensionData = [];
  }

  ngOnInit() {
  }

}
