import { DimensionService } from './../dimension-service/dimension.service';
import { AssessmentService } from './../assessment/assessment.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'a-stress',
  templateUrl: './a-stress.component.html',
  styleUrls: ['./a-stress.component.css']
})
export class AStressComponent implements OnInit {

  public questions;
  public answers;
  public subquestions;
  public assessmentData;
  public dimensionData;
  public stressData;

  constructor(public as: AssessmentService, public ds: DimensionService) { 

    this.questions = this.as.questions;
    this.answers = this.as.answers;
    this.subquestions = this.as.subquestions;
    this.assessmentData = [];
  }

  ngOnInit() {

    this.ds.getStressData().subscribe(res=>{
        this.stressData = res;
        //console.log(this.stressData);
    })
  }
}