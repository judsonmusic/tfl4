import { ActivatedRoute } from '@angular/router';
import{ Component , OnInit, Input} from '@angular/core';
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
  @Input() assessmentData: any;

  public areas:any;
  public categories: any;
  public surveyComplete: any;
  public userData: any;
  public datamode;
  public guidemode;

  constructor(public route: ActivatedRoute, public router: Router, public assessmentService: AssessmentService, public userService: UserService, public surveyService: SurveyService) {

   
    this.router = router;
    this.assessmentService = assessmentService;
    this.areas = this.assessmentService.questions;
    this.userService = userService;
    this.surveyService = surveyService;

  }


  ngOnInit() {

    //console.log('Init TFL guide component....')
    if(!this.assessmentData){
      //console.log('We have no assessment data...')
    this.userService.getUser().subscribe((user) => {
      //console.log('user data retrieved...', user);
      this.userData = user;

       this.assessmentService.getByUserId(this.userData._id, this.route.snapshot.params['assessment_id'] ).subscribe(res => {
          console.log('The result from getting the assessment is: ', res.length, res);
          this.assessmentData = res[0]; //stores all of the assessment data.   
          
      }); 
    });
  }



  }

  goToDashboard() {

    this.router.navigate(['/dashboard']);

  }

}
