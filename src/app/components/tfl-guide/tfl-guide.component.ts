import{ Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {AssessmentService} from "../assessment/assessment.service";
import {UserService} from "../user-service/user.service";
import {SurveyService} from "../a-survey/survey.service";
declare var System:any;

@Component({
  selector: 'action',
  templateUrl: 'tfl-guide.component.html'
})
export class TflGuideComponent implements OnInit {

  public areas:any;
  public assessmentData: any[];
  public categories: any;
  public surveyComplete: any;
  public userData: any;
  public datamode;
  public guidemode;

  constructor(public router: Router, public assessmentService: AssessmentService, public userService: UserService, public surveyService: SurveyService) {

    this.router = router;
    this.assessmentService = assessmentService;
    this.areas = this.assessmentService.questions;
    this.userService = userService;
    this.userData = this.userService.userData;
    this.surveyService = surveyService;

   if(!this.surveyService.surveyComplete){

    }


  }


  ngOnInit() {



  }

  goToDashboard() {

    this.router.navigate(['/dashboard']);

  }

}
